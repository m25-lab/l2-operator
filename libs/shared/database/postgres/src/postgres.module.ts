import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getMetadataArgsStorage } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: getMetadataArgsStorage().tables.map((table) => {
            return table.target
          }),
          logging: configService.get<boolean>('database.enabledLogging'),
          bigNumberStrings: false,
          namingStrategy: new SnakeNamingStrategy(),
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class PostgresDatabaseSharedModule {}
