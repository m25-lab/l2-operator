import { sign } from 'jsonwebtoken'

export function createCustomToken(
  clientId: string,
  clientSecret: string,
  issuer: string,
  user: any,
  payload?: any,
) {
  const options = {
    audience: user.aud || clientId,
    issuer: issuer,
  }

  return sign(payload || user, clientSecret, options)
}
