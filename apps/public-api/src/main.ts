import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import hpp from 'hpp'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

import { PublicApiModule } from './public-api.module'

async function bootstrap() {
  const app = await NestFactory.create(PublicApiModule)
  const configService = app.get<any>(ConfigService)

  console.log(configService.get('publicAPICors'))
  app.enableCors({
    origin: configService.get('publicAPICors'),
    credentials: true,
  })
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.use(cookieParser())
  app.use(helmet())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Public API Document')
    .setDescription('Public API Document')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build()

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const port = configService.get('publicAPIPort') || 8001

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
  })
}
bootstrap()
