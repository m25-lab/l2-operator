import { ethers } from 'ethers'

export class SwapTransaction {
  nonce: number
  accountIndex: number
  buy: boolean
  nativeValue: ethers.BigNumber
  tokenValue: ethers.BigNumber
  signature: string
  price: number
  txid: string

  constructor(
    nonce: number,
    accountIndex: number,
    buy: boolean,
    nativeValue: ethers.BigNumber,
    tokenValue: ethers.BigNumber,
    signature: string,
  ) {
    this.nonce = nonce
    this.accountIndex = accountIndex
    this.buy = buy
    this.nativeValue = nativeValue
    this.tokenValue = tokenValue
    this.signature = signature

    this.price = ethers.BigNumber.from(nativeValue)
      .div(ethers.BigNumber.from(tokenValue))
      .toNumber()
    this.txid = ethers.utils.keccak256(
      ethers.utils.solidityPack(
        ['uint24', 'uint32', 'bool', 'uint80', 'uint80'],
        [nonce, accountIndex, buy, nativeValue, tokenValue],
      ),
    )
  }

  verifySignature(address: string): boolean {
    return (
      ethers.utils.verifyMessage(
        ethers.utils.arrayify(this.txid),
        this.signature,
      ) === address
    )
  }

  toHex(): string {
    return (
      '0x' +
      ethers.utils.hexZeroPad(ethers.utils.hexlify(this.nonce), 6).slice(2) +
      ethers.utils
        .hexZeroPad(ethers.utils.hexlify(this.accountIndex), 8)
        .slice(2) +
      (this.buy ? '01' : '00') +
      ethers.utils.hexZeroPad(this.nativeValue.toHexString(), 20).slice(2) +
      ethers.utils.hexZeroPad(this.tokenValue.toHexString(), 20).slice(2) +
      this.signature.slice(2)
    )
  }

  toJson(): any {
    return {
      nonce: this.nonce,
      accountIndex: this.accountIndex,
      buy: this.buy,
      nativeValue: this.nativeValue,
      tokenValue: this.tokenValue,
      signature: this.signature,
      price: this.price,
      txid: this.txid,
    }
  }
}

export class SwapTransactionBatch {
  batch: Array<SwapTransaction>
  root: string

  constructor() {
    this.batch = []
  }

  toHex(): string {
    return '0x' + this.batch.map((tx) => tx.toHex().slice(2)).join('')
  }

  getTransaction(txid: string): SwapTransaction {
    return this.batch.find((tx) => tx.txid === txid)
  }

  toJson(): any {
    return {
      batch: this.batch.map((tx) => tx.toJson()),
      root: this.root,
    }
  }

  push(tx: SwapTransaction) {
    this.batch.push(tx)
  }

  remove(txid: string) {
    this.batch = this.batch.filter((tx) => tx.txid !== txid)
  }

  hash(): string {
    return ethers.utils.keccak256(this.toHex())
  }
}
