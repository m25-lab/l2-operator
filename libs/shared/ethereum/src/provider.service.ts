import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ethers } from 'ethers'
import { Provider, setMulticallAddress } from 'ethers-multicall'
import { Repository } from 'typeorm'
import { BaseService } from '@lib/shared/base'
import { ChainEntity } from '@lib/shared/entities'

@Injectable()
export class ProviderService extends BaseService<
  ChainEntity,
  Repository<ChainEntity>
> {
  private chainConfig: ChainEntity[]
  constructor(
    @InjectRepository(ChainEntity)
    repository: Repository<ChainEntity>,
  ) {
    super(repository)
  }

  async onModuleInit() {
    this.chainConfig = await this.repository.find()
  }

  async updateChainConfig() {
    this.chainConfig = await this.repository.find()
  }

  getChainConfig(chainId: string): ChainEntity {
    const list = this.chainConfig.filter((c) => c.chain === chainId)
    if (!list.length) {
      throw new Error(`Chain ${chainId} not found`)
    }

    return list[0]
  }

  getRandomChainRPC(chainId: string): string {
    const list = this.getChainConfig(chainId)
    const rpcList = list.rpcUrls

    return rpcList[Date.now() % rpcList.length]
  }

  getRandomChainProvider(chainId: string): ethers.providers.JsonRpcProvider {
    return new ethers.providers.JsonRpcProvider(this.getRandomChainRPC(chainId))
  }

  getChainProvider(rpc: string) {
    return new ethers.providers.JsonRpcProvider(rpc)
  }

  async getMultiCallProvider(chainId: string) {
    const rpcChainProvider = this.getRandomChainProvider(chainId)

    setMulticallAddress(555, this.getChainConfig(chainId).multicallAddress)
    const provider = new Provider(rpcChainProvider, 555)

    return provider
  }
}
