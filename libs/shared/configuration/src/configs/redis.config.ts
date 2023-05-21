export const redisConfig = () => ({
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
})
