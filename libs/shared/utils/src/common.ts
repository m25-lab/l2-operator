export const getPaginationSkip = (page: number, pageSize: number) => {
  return (page - 1) * pageSize || 0
}

export const getTokenBlacklistCacheKey = (payload: string) => {
  return `token_blacklist:${payload}`
}

export const getRefreshTokenCacheKey = (payload: string) => {
  return `refresh_token:${payload}`
}

export const sleep = (timeout: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timeout))
}

export const extractHashtags = (searchText: string): string[] => {
  const regexp = /\B\#\w\w+\b/g

  return searchText.match(regexp) ?? []
}
