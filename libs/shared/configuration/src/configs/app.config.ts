export const appConfig = () => ({
  environment: process.env.CURRENT_ENV || 'development',
  nodeENV: process.env.NODE_ENV,
  localTimezone: process.env.TZ,
  publicAPIPort: parseInt(process.env.WALLET_API_PORT || '8000', 10),
  publicAPICors: process.env.WALLET_API_CORS?.split(',') || ['*'],
  catchTTL: parseInt(process.env.CATCH_TTL || '6000', 10),
  cookie: {
    domain: process.env.COOKIE_DOMAIN,
  },
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
})
