import { Injectable } from '@nestjs/common'
import { BigNumber, ethers } from 'ethers'
import { Contract } from 'ethers-multicall'
import { convertToBigNumber } from '@lib/shared/utils'

import ERC20_ABI from './contracts/abi/ERC20.json'
import { ERC20__factory } from './contracts/types'
import { BalanceResponse, TokenInfoResponse } from './interface/token.interface'
import { ProviderService } from './provider.service'

@Injectable()
export class Erc20Service {
  constructor(private providerService: ProviderService) {}

  getMultiCallERC20Contract(address: string) {
    return new Contract(address, ERC20_ABI)
  }

  async getBalance(
    chainId: string,
    tokenAddress: string,
    accountAddress: string,
  ) {
    const provider = this.providerService.getRandomChainProvider(chainId)

    const tokenContract = ERC20__factory.connect(tokenAddress, provider)

    const [decimals, balance] = await Promise.all([
      tokenContract.decimals(),
      tokenContract.balanceOf(accountAddress),
    ])

    return {
      rawBalance: balance.toHexString(),
      balance: ethers.utils.formatUnits(balance, decimals),
      decimals,
    }
  }

  async getMultiBalance(
    chainId: string,
    tokenAddresses: string[],
    accountAddress: string,
  ) {
    const provider = await this.providerService.getMultiCallProvider(chainId)

    const calls = []

    for (const tokenAddress of tokenAddresses) {
      const tokenContract = this.getMultiCallERC20Contract(tokenAddress)
      calls.push(
        tokenContract.decimals(),
        tokenContract.balanceOf(accountAddress),
      )
    }

    const results = await provider.all(calls)

    const reponses = []
    for (let i = 0; i < results.length; i += 2) {
      const decimals = results[i]
      const balance = results[i + 1]

      reponses.push({
        rawBalance: balance.toHexString(),
        balance: ethers.utils.formatUnits(balance, decimals),
        decimals,
        token: tokenAddresses[i / 2].toLocaleLowerCase(),
      })
    }

    return reponses
  }

  async getMultiBalanceWithDecimals(
    chainId: string,
    tokens: string[],
    accountAddress: string,
  ): Promise<BalanceResponse[]> {
    const provider = await this.providerService.getMultiCallProvider(chainId)

    const calls = []

    for (const tokenAddress of tokens) {
      const tokenContract = this.getMultiCallERC20Contract(tokenAddress)
      calls.push(
        tokenContract.decimals(),
        tokenContract.balanceOf(accountAddress),
      )
    }

    const results = await provider.all(calls)

    const reponses: BalanceResponse[] = []
    for (let i = 0; i < results.length; i += 2) {
      const decimals = results[i]
      const balance = results[i + 1]

      reponses.push({
        rawBalance: balance.toHexString(),
        balance: ethers.utils.formatUnits(balance, decimals),
        decimals,
        token: tokens[i / 2].toLocaleLowerCase(),
      })
    }

    return reponses
  }

  async getTokenInfo(chainId: string, tokenAddress: string) {
    const provider = await this.providerService.getMultiCallProvider(chainId)

    const calls = []

    const tokenContract = this.getMultiCallERC20Contract(tokenAddress)
    calls.push(
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
    )

    const results = await provider.all(calls)

    return {
      address: tokenAddress.toLocaleLowerCase(),
      name: results[0],
      symbol: results[1],
      decimals: results[2],
      logo: '',
      chain: chainId.toString(),
    }
  }

  async getMultiTokenInfo(
    chainId: string,
    tokenAddresses: string[],
  ): Promise<TokenInfoResponse[]> {
    const provider = await this.providerService.getMultiCallProvider(chainId)

    const calls = []

    for (const tokenAddress of tokenAddresses) {
      const tokenContract = this.getMultiCallERC20Contract(tokenAddress)
      calls.push(
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals(),
      )
    }

    const results = await provider.all(calls)

    const reponses: TokenInfoResponse[] = []
    for (let i = 0; i < results.length; i += 3) {
      const name = results[i]
      const symbol = results[i + 1]
      const decimals = results[i + 2]

      reponses.push({
        address: tokenAddresses[i / 3].toLocaleLowerCase(),
        name,
        symbol,
        decimals,
        logo: '',
        chain: chainId.toString(),
      })
    }

    return reponses
  }

  async validBalanceBeforeSend(
    chainId: string,
    value: string,
    tokenAdress: string,
    wallet: string,
  ) {
    const { decimals, rawBalance } = await this.getBalance(
      chainId,
      tokenAdress,
      wallet,
    )

    const amount = convertToBigNumber(value, decimals)

    if (amount.gt(BigNumber.from(rawBalance)))
      throw new Error('Insufficient balance')

    return amount
  }

  async estimateGasPrice(chainId: string, decimals: number) {
    const fee = await this.providerService
      .getRandomChainProvider(chainId)
      .getFeeData()
    for (const i in fee) {
      fee[i] = ethers.utils.formatUnits(fee[i], decimals)
    }

    return fee
  }
}
