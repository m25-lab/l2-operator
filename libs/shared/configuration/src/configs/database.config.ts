export const databaseConfig = () => ({
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT) || 3306,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DATABASE_NAME,
    enabledLogging: process.env.POSTGRES_ENABLE_LOGGING === 'true',
  },
})
