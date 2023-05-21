export const kafkaConfig = () => ({
  kafka: {
    brokers: process.env.KAFKA_BROKERS,
  },
})
