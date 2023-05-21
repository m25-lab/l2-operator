export class TokenInfoResponse {
  address: string
  name: string
  symbol: string
  decimals: number
  logo: string
  chain: string
}

export class BalanceResponse {
  rawBalance: string
  balance: string
  decimals: number
  token?: string
}
