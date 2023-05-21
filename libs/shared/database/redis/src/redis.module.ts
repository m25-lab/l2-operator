import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RedisModule } from '@liaoliaots/nestjs-redis'

import { RedisClientService } from './redis-client.service'

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          config: configService.get('redis'),
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisDatabaseSharedModule {}
