import { randomInt } from 'crypto'

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { ethers } from 'ethers'
import { Repository } from 'typeorm'
import { BaseService } from '@lib/shared/base'
import { AccountEntity, BlockEntity } from '@lib/shared/entities'

import Capy from './Capy.json'
import { OrderBook } from './orderbook.service'
import { SwapTransaction, SwapTransactionBatch } from './transaction.service'

let RPC: string, CONTRACT: string, PRIVATEKEY: string

@Injectable()
export class PublicApiService extends BaseService<
  AccountEntity,
  Repository<AccountEntity>
> {
  mempool: SwapTransactionBatch
  provider: ethers.providers.JsonRpcProvider
  contract: ethers.Contract

  constructor(
    @InjectRepository(AccountEntity)
    repository: Repository<AccountEntity>,
    @InjectRepository(BlockEntity)
    private blockRepository: Repository<BlockEntity>,
    private readonly configService: ConfigService,
  ) {
    super(repository)

    RPC = this.configService.get('eth.rpc')
    CONTRACT = this.configService.get('eth.contract')
    PRIVATEKEY = this.configService.get('eth.privateKey')

    this.provider = new ethers.providers.JsonRpcProvider(RPC)
    const signer = new ethers.Wallet(PRIVATEKEY, this.provider)

    this.contract = new ethers.Contract(CONTRACT, Capy['abi'], signer)

    this.trackNewAccount()
    this.mempool = new SwapTransactionBatch()
  }

  trackNewAccount() {
    this.contract.on('AccountCreated', (id, address, event) => {
      this.repository.save({
        id,
        address,
        nativeBalance: '0',
        tokenBalance: '0',
        nonce: 0,
      })
    })
  }

  async newMerlkTree(): Promise<{
    node: Array<string>
    leaf: Array<string>
  }> {
    const account = await this.repository.find()
    const leaf: Array<string> = []
    const detailLeaf: Array<string> = []

    for (let i = 0; i < account.length; i++) {
      const state = ethers.utils.solidityPack(
        ['uint24', 'uint32', 'address', 'uint256', 'uint256'],
        [
          account[i].nonce,
          account[i].id,
          account[i].address,
          account[i].nativeBalance,
          account[i].tokenBalance,
        ],
      )

      leaf.push(ethers.utils.keccak256(state))
      detailLeaf.push(state)
    }

    let maxLen = 1
    while (maxLen < leaf.length) {
      maxLen *= 2
    }

    for (let i = 0; i < maxLen - leaf.length; i++) {
      leaf.push(ethers.utils.keccak256('0x00'))
    }

    const node = [...(await this.buildMerkleTree(leaf)), ...leaf]

    return {
      node,
      leaf: detailLeaf,
    }
  }

  async buildMerkleTree(childNode: Array<string>): Promise<Array<string>> {
    const newChildNode: Array<string> = []
    if (childNode.length === 1) {
      return []
    }

    for (let i = 0; i < childNode.length; i += 2) {
      newChildNode.push(
        ethers.utils.keccak256(childNode[i] + childNode[i + 1].slice(2)),
      )
    }

    return [...(await this.buildMerkleTree(newChildNode)), ...newChildNode]
  }

  async sendTransaction(transactionData: string): Promise<any> {
    if (transactionData.startsWith('0x')) {
      transactionData = transactionData.slice(2)
    }

    if (transactionData.length !== 162) {
      throw new ConflictException('Invalid transaction data')
    }

    const tx = new SwapTransaction(
      parseInt(transactionData.slice(0, 6), 16),
      parseInt(transactionData.slice(6, 14), 16),
      transactionData.slice(14, 16) === '01',
      transactionData.slice(16, 24),
      transactionData.slice(24, 32),
      transactionData.slice(32, 162),
    )

    console.log(tx.toJson())

    const account = await this.repository.findOne({
      where: { id: tx.accountIndex },
    })

    if (!account) {
      throw new ConflictException('Account not found')
    }

    if (tx.nonce !== account.nonce + 1) {
      throw new ConflictException('Invalid nonce')
    }

    if (!tx.verifySignature(account.address)) {
      throw new ConflictException('Invalid signature')
    }

    if (tx.buy) {
      if (ethers.BigNumber.from(account.nativeBalance).lt(tx.nativeValue)) {
        throw new ConflictException('Insufficient native balance')
      }
    } else {
      if (ethers.BigNumber.from(account.tokenBalance).lt(tx.tokenValue)) {
        throw new ConflictException('Insufficient token balance')
      }
    }

    this.mempool.push(tx)

    return tx.toJson()
  }

  async submitBatch() {
    const accountMap = new Map<number, AccountEntity>()
    const interactSet = new Set<number>()

    const orderBook = new OrderBook(this.mempool)

    const batch = new SwapTransactionBatch()
    const match = await orderBook.match()

    match.executedTrades.forEach((txid) => {
      batch.push(this.mempool.getTransaction(txid))
    })

    for (let i = 0; i < batch.batch.length; i++) {
      const tx = batch.batch[i]
      if (!interactSet.has(tx.accountIndex)) {
        interactSet.add(tx.accountIndex)
        accountMap.set(
          tx.accountIndex,
          await this.repository.findOne({
            where: { id: tx.accountIndex },
          }),
        )
      }

      const account = accountMap.get(tx.accountIndex)

      if (tx.buy) {
        account.nativeBalance = ethers.BigNumber.from(account.nativeBalance)
          .sub(ethers.BigNumber.from(tx.nativeValue))
          .toString()
        account.tokenBalance = ethers.BigNumber.from(account.tokenBalance)
          .add(ethers.BigNumber.from(tx.tokenValue))
          .toString()
      } else {
        account.nativeBalance = ethers.BigNumber.from(account.nativeBalance)
          .add(ethers.BigNumber.from(tx.nativeValue))
          .toString()
        account.tokenBalance = ethers.BigNumber.from(account.tokenBalance)
          .sub(ethers.BigNumber.from(tx.tokenValue))
          .toString()
      }
      account.nonce += 1

      this.mempool.remove(tx.txid)
    }

    for (const index of interactSet) {
      await this.repository.save(accountMap.get(index))
    }

    const merlkTree = await this.newMerlkTree()
    const block = new BlockEntity({
      blockNumber: ethers.BigNumber.from(
        await this.contract.getBlockCount(),
      ).toNumber(),
      version: 0,
      stateSize: merlkTree.leaf.length,
      stateRoot: merlkTree.node[0],
      hardTransactionsCount: 0,
      transactionsRoot: batch.hash(),
      transactionsHash: batch.hash(),
      stateNode: merlkTree.node,
      stateLeaf: merlkTree.leaf,
    })

    await this.blockRepository.save(block)

    await this.contract.submitBlock(
      {
        version: block.version,
        blockNumber: block.blockNumber,
        stateSize: block.stateSize,
        stateRoot: block.stateRoot,
        hardTransactionsCount: block.hardTransactionsCount,
        transactionsRoot: block.transactionsRoot,
      },
      batch.toHex(),
    )
  }

  async getMempool() {
    return this.mempool.toJson()
  }

  async getAccount(id: number) {
    return this.repository.findOne({
      where: { id },
    })
  }

  async getStateProof(
    blockNumber: number,
    accountIndex: number,
  ): Promise<{ trace: Array<string>; sibling: Array<string>; state: string }> {
    const block = await this.blockRepository.findOne({
      where: { blockNumber },
    })

    if (!block) {
      throw new ConflictException('Block not found')
    }

    const account = await this.repository.findOne({
      where: { id: accountIndex },
    })

    if (!account) {
      throw new ConflictException('Account not found')
    }

    let index = 0
    const trace = []
    const sibling = []

    let l = 0
    let r = block.stateLeaf.length - 1

    while (l < r) {
      trace.push(block.stateNode[index])
      if (index != 0) {
        sibling.push(block.stateNode[index % 2 == 0 ? index - 1 : index + 1])
      }

      const mid = (l + r) >> 1
      if (accountIndex - 1 <= mid) {
        index = index * 2 + 1
        r = mid
      } else {
        index = index * 2 + 2
        l = mid + 1
      }
    }
    trace.push(block.stateNode[index])
    sibling.push(block.stateNode[index % 2 == 0 ? index - 1 : index + 1])

    return {
      trace,
      sibling,
      state: block.stateLeaf[accountIndex - 1],
    }
  }
}
