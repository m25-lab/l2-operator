import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const ClientId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()
    const clientId = request.cookies.client_id ?? request.headers['x-client-id']

    return clientId
  },
)
