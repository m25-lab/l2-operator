import { applyDecorators } from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'

export function ApiCommonHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'x-lang',
      description: 'The language to display in the API response',
    }),
    ApiHeader({
      name: 'x-client-id',
      description: 'The unique client id',
    }),
  )
}
