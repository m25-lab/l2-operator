export const SKIP_AUTH_GUARD_KEY = 'SkipAuth'
export const PERMISSION_GUARD_KEY = 'PermissionAuth'
export const UNCHECK_AUTH_GUARD_KEY = 'UncheckAuth'

export const UUID_NAMESPACE = 'b673551a-01ce-4fc5-8c16-0a1f02d68796'

export const ETH_ADDRESS_LEN = 42

export const ROLE = {
  NONE: `NONE`,
  ADMIN: `ADMIN`,
  MANAGER: `MANAGER`,
  DAO: `DAO-MANAGER`,
  DOO_USERS: `DOO-USERS`,
}

export const ADDRESS = {
  ADDRESS_0X: '0x0000000000000000000000000000000000000000',
}

export const CONTRACT = {
  NAME: {
    DOOE_TOKEN: 'BooToken',
    BRIDGE_CONVERTER: 'BridgeConverter',
    ERC20: 'ERC20',
    BERC20: 'BERC20',
    B_TOKEN: 'BToken',
    DOO_USD: 'BooUSD',
  },
}

export const UUID_TYPE = {
  WALLET_TOKEN: 1,
  ACCOUNT_TOKEN: 2,
  WALLET_DOO_TOKEN: 3,
  CHAIN: 4,
  TX_LOG: 5,
  CONTRACT: 6,
  CONTACT: 7,
}

export const ACCOUNT = {
  MAX: 100,
}

export const TX_LOG_ACTION = {
  COIN_TRANSFER: 'COIN_TRANSFER',
  DOO_TRANSFER: 'DOO_TRANSFER',
  PUBLIC_TOKEN_TRANSFER: 'TOKEN_TRANSFER',
  DOO_TOKEN_TRANSFER: 'DOO_TOKEN_TRANSFER',
  BRIDGE_TRANSFER: 'BRIDGE_TRANSFER',
}

export const BRIDGE = {
  MINIMUM_AMOUNT: 1000000000000000,
}

export const COVALENTHQ_CHAIN = {
  BTC: 'btc-mainnet',
  ETH: 'eth-mainnet',
  MATIC: 'matic-mainnet',
  BSC: 'bsc-mainnet',
  TESTNET: 'bsc-testnet',
  ARBITRUM: 'arbitrum-mainnet',
}

export const CONSUMER = {
  RETRY_DELAY: 5000,
  RETRY_MAX: 3,
}

export const KAFKA = {
  TOPICS: {
    ACCOUNT_CREATED: 'account-created',
  },
}
