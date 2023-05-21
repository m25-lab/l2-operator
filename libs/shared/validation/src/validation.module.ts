import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { i18nValidationErrorFactory } from 'nestjs-i18n'

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
          exceptionFactory: i18nValidationErrorFactory,
        })
      },
    },
  ],
  exports: [],
})
export class ValidationSharedModule {}
