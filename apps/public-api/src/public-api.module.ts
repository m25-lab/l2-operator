import { Module } from '@nestjs/common'
import { CoreModule } from '@lib/core'

import { PublicApiController } from './public-api.controller'
import { PublicApiService } from './public-api.service'

@Module({
  imports: [CoreModule],
  controllers: [PublicApiController],
  providers: [PublicApiService],
})
export class PublicApiModule {}
