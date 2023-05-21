import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import {
  ActionResponseInit,
  AppHTTPResponse,
  HTTPResponse,
} from '@lib/shared/interfaces'

export class ActionResponse<T> implements HTTPResponse<T> {
  @ApiProperty()
  success: boolean

  @ApiProperty()
  status_code: HttpStatus

  @ApiProperty()
  message: string

  data?: T

  @ApiProperty()
  error?: unknown

  constructor(initData?: ActionResponseInit<T>) {
    const {
      success = true,
      status_code: statusCode = HttpStatus.OK,
      message = 'Successfully!',
      error,
      data,
    } = initData ?? {}

    this.success = success
    this.message = message
    this.status_code = statusCode
    this.data = data
    this.error = error
  }
}

export class AppActionResponse<T> implements AppHTTPResponse<T> {
  metaData: {
    success: boolean
    status_code: HttpStatus
    message: string
  }
  data?: T
  error?: unknown

  constructor(initData?: ActionResponseInit<T>) {
    const {
      success = true,
      status_code: statusCode = HttpStatus.OK,
      message = 'Successfully!',
      error,
      data,
    } = initData ?? {}

    this.metaData = {
      success,
      message,
      status_code: statusCode,
    }
    this.data = data
    this.error = error
  }
}
