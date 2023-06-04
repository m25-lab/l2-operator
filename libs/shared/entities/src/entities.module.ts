import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AccountEntity } from './entities/account.entity'
import { BlockEntity } from './entities/block.entity'
import { CheckpointEntity } from './entities/checkpoint.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, BlockEntity, CheckpointEntity]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class EntitiesSharedModule {}
