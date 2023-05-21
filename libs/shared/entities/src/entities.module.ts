import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountEntity } from './entities/account.entity'
import { ChainEntity } from './entities/chain.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, ChainEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class EntitiesSharedModule {}
