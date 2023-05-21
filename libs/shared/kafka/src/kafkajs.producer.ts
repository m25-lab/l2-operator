import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka, Message, Producer as KafkaProducer } from 'kafkajs'
import { sleep } from '@lib/shared/utils'

import { Producer } from './interface/producer.interface'

export class KafkajsProducer implements Producer {
  private readonly kafka: Kafka
  private readonly producer: KafkaProducer
  private readonly logger: Logger

  constructor(
    private readonly topic: string,
    brokers: string[],
    private configService: ConfigService,
  ) {
    this.kafka = new Kafka({
      clientId: this.configService.get('kafka.clientId'),
      brokers,
    })
    this.producer = this.kafka.producer()
    this.logger = new Logger(topic)
  }

  async produce(message: Message) {
    await this.producer.send({ topic: this.topic, messages: [message] })
  }

  async connect() {
    try {
      await this.producer.connect()
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err)
      await sleep(5000)
      await this.connect()
    }
  }

  async disconnect() {
    await this.producer.disconnect()
  }
}
