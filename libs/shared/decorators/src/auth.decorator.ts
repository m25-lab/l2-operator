import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common'
import { Request } from 'express'
import {
  PERMISSION_GUARD_KEY,
  SKIP_AUTH_GUARD_KEY,
  UNCHECK_AUTH_GUARD_KEY,
} from '@lib/shared/constants'

export const Public = () => {
  return SetMetadata(SKIP_AUTH_GUARD_KEY, true)
}

export const Permission = (...permissions: string[]) => {
  return SetMetadata(PERMISSION_GUARD_KEY, permissions)
}

export const SessionID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()
    const sessionID = request.cookies.session_id

    return sessionID
  },
)

export const UnCheckAuth = () => {
  return SetMetadata(UNCHECK_AUTH_GUARD_KEY, true)
}
