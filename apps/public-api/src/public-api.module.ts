import { Module } from '@nestjs/common'
import { CoreModule } from '@lib/core'
import { EntitiesSharedModule } from '@lib/shared/entities'

import { PublicApiController } from './public-api.controller'
import { PublicApiService } from './public-api.service'

@Module({
  imports: [CoreModule, EntitiesSharedModule],
  controllers: [PublicApiController],
  providers: [PublicApiService],
})
export class PublicApiModule {}
