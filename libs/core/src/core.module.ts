import { Module } from '@nestjs/common'
import { ConfigurationSharedModule } from '@lib/shared/configuration'
import { PostgresDatabaseSharedModule } from '@lib/shared/database/postgres'
import { RedisDatabaseSharedModule } from '@lib/shared/database/redis'
import { FiltersSharedModule } from '@lib/shared/filter'
import { LoggerSharedModule } from '@lib/shared/logger'
import { ValidationSharedModule } from '@lib/shared/validation'

@Module({
  imports: [
    ConfigurationSharedModule,
    LoggerSharedModule,
    FiltersSharedModule,
    ValidationSharedModule,
    PostgresDatabaseSharedModule,
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
