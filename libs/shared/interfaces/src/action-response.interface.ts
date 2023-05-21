import { HttpStatus } from '@nestjs/common'

export interface HTTPResponse<T = unknown> {
  success: boolean
  status_code: HttpStatus
  message: string
  error?: unknown
  data?: T
}

export interface ActionResponseInit<T> {
  success?: boolean
  status_code?: HttpStatus
  message?: string
  error?: unknown
  data?: T
}

export interface AppHTTPResponse<T = unknown> {
  metaData: {
    success: boolean
    status_code: HttpStatus
    message: string
  }
  error?: unknown
  data?: T
}
