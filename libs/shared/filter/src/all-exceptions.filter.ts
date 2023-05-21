import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { pick } from 'lodash'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import {
  getI18nContextFromArgumentsHost,
  I18nContext,
  I18nValidationException,
} from 'nestjs-i18n'
import { QueryFailedError } from 'typeorm'
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  QUERY_EXCEPTION_MESSAGE,
} from '@lib/shared/constants'
import { AppHTTPResponse, HTTPResponse } from '@lib/shared/interfaces'
import { toArray } from '@lib/shared/utils'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private configService: ConfigService,
  ) {}

  private static handleAppResponse(
    response: Response,
    exception: HttpException | QueryFailedError | Error | BadRequestException,
  ): void {
    const responseBody: AppHTTPResponse = {
      metaData: {
        success: false,
        message: INTERNAL_SERVER_ERROR_MESSAGE,
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    }
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      responseBody.metaData.status_code = exception.getStatus()

      if (exception instanceof ForbiddenException) {
        responseBody.metaData.message = 'Không có quyền truy cập.'
      } else {
        responseBody.metaData.message = toArray(
          (exception.getResponse() as any).message,
        ).join('\n')
      }

      statusCode = exception.getStatus() as HttpStatus
    } else if (exception instanceof QueryFailedError) {
      responseBody.metaData.message = QUERY_EXCEPTION_MESSAGE
      statusCode = HttpStatus.BAD_REQUEST
      responseBody.metaData.status_code = statusCode
    } else if (exception instanceof Error) {
      responseBody.metaData.message = INTERNAL_SERVER_ERROR_MESSAGE
    }

    response.status(statusCode).json(responseBody)
  }

  private static handleResponse(
    response: Response,
    exception: HttpException | QueryFailedError | Error | BadRequestException,
    i18n: I18nContext,
  ): void {
    const responseBody: HTTPResponse = {
      success: false,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
    }
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      responseBody.status_code = exception.getStatus()
      statusCode = exception.getStatus() as HttpStatus

      if (exception instanceof ForbiddenException) {
        responseBody.message =
          !exception.message || exception.message == 'Forbidden resource'
            ? i18n.t('messages.exceptions.unauthorized')
            : exception.message
      } else if (exception instanceof I18nValidationException) {
        statusCode = HttpStatus.UNPROCESSABLE_ENTITY
        responseBody.status_code = HttpStatus.UNPROCESSABLE_ENTITY
        responseBody.message = i18n.t('messages.exceptions.badRequest')
        responseBody.error = exception.errors?.map((error) => {
          const messages = Object.keys(error?.constraints).reduce(
            (result, constraintKey) => {
              const message = i18n.t(
                error?.constraints[constraintKey]?.split('|')?.[0],
              )
              result.push(message)

              return result
            },
            [],
          )

          return {
            property: error.property,
            messages,
          }
        })
      } else {
        responseBody.message = toArray(
          (exception.getResponse() as any).message,
        ).join('\n')
      }
    } else if (exception instanceof QueryFailedError) {
      responseBody.message = i18n.t('messages.exceptions.queryDatabaseError')
      statusCode = HttpStatus.BAD_REQUEST
      responseBody.status_code = statusCode
    } else if (exception instanceof Error) {
      responseBody.message = i18n.t('messages.exceptions.internalServerError')
    }

    response.status(statusCode).json(responseBody)
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const i18n = getI18nContextFromArgumentsHost(host)

    // Handling error message and logging
    this.handleMessage(exception, ctx)

    // Response to client
    AllExceptionsFilter.handleResponse(response, exception, i18n)
  }

  private handleMessage(
    exception: HttpException | QueryFailedError | Error,
    context: HttpArgumentsHost,
  ): void {
    let message = 'Internal Server Error'
    const request = context.getRequest()

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse())
    } else if (exception instanceof QueryFailedError) {
      message = exception.stack.toString()
    } else if (exception instanceof Error) {
      message = exception.stack.toString()
    }

    this.logger.error({
      message,
      request: pick(request, [
        'headers',
        'url',
        'method',
        'params',
        'query',
        'body',
      ]),
    })
  }
}
