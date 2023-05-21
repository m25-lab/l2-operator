import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChainEntity } from '@lib/shared/entities'

import { CoinService } from './coin.service'
import { Erc20Service } from './erc20.service'
import { ProviderService } from './provider.service'

@Module({
  imports: [TypeOrmModule.forFeature([ChainEntity])],
  providers: [CoinService, Erc20Service, ProviderService],
  exports: [CoinService, Erc20Service, ProviderService],
})
export class EthereumSharedModule {}
