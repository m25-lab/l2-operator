import { Injectable } from '@nestjs/common'
import { BigNumber, ethers } from 'ethers'
import { ADDRESS } from '@lib/shared/constants'
import { convertToBigNumber } from '@lib/shared/utils'

import { BalanceResponse } from './interface/token.interface'
import { ProviderService } from './provider.service'

@Injectable()
export class CoinService {
  constructor(private providerService: ProviderService) {}

  async getBalance(chainId: string, address: string): Promise<BalanceResponse> {
    const provider = this.providerService.getRandomChainProvider(chainId)

    const balance = await provider.getBalance(address)

    return {
      rawBalance: balance.toHexString(),
      balance: ethers.utils.formatEther(balance),
      decimals: 18,
    }
  }

  async validBalanceBeforeSend(
    chainId: string,
    value: string,
    wallet: string,
    gas: number,
    maxFeePerGas: string,
  ) {
    const { rawBalance } = await this.getBalance(chainId, wallet)

    const amount = convertToBigNumber(value)

    if (
      amount.gt(
        BigNumber.from(rawBalance).sub(
          convertToBigNumber(maxFeePerGas).mul(gas),
        ),
      )
    )
      throw new Error('Insufficient coin balance')

    return amount
  }
}
