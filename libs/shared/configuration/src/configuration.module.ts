import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { appConfig } from './configs/app.config'
import { databaseConfig } from './configs/database.config'
import { kafkaConfig } from './configs/kafka.config'
import { redisConfig } from './configs/redis.config'
import { S3Config } from './configs/s3.config'
import { validationSchema } from './validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, redisConfig, S3Config, kafkaConfig],
      validationSchema,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigurationSharedModule {}
