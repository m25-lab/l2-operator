import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import retry from 'async-retry'
import {
  Admin,
  Consumer as KafkaConsumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaMessage,
} from 'kafkajs'
import { Repository } from 'typeorm'
import { sleep } from '@lib/shared/utils'

import { Consumer } from './interface/consumer.interface'
import { KafkaDeadLetterQueueEntity } from './kafka-dead-letter-queue.entity'

export class KafkajsConsumer implements Consumer {
  private readonly kafka: Kafka
  private readonly consumer: KafkaConsumer
  private readonly logger: Logger
  private readonly admin: Admin

  constructor(
    private readonly topic: ConsumerSubscribeTopic,
    private readonly repository: Repository<KafkaDeadLetterQueueEntity>,
    config: ConsumerConfig,
    brokers: string[],
    private configService: ConfigService,
  ) {
    this.kafka = new Kafka({
      brokers,
      clientId: this.configService.get('kafka.clientId'),
    })
    this.consumer = this.kafka.consumer(config)
    this.admin = this.kafka.admin()
    this.logger = new Logger(`${topic.topic}-${config.groupId}`)
  }

  public async createTopic(topic: string) {
    await this.admin.createTopics({
      topics: [
        {
          topic,
          numPartitions: 1,
          replicationFactor: 1,
        },
      ],
    })
  }

  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic)
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`)
        try {
          await retry(async () => onMessage(message), {
            retries: 3,
            onRetry: (error, attempt) =>
              this.logger.error(
                `Error consuming message, executing retry ${attempt}/3...`,
                error,
              ),
          })
        } catch (err) {
          this.logger.error(
            'Error consuming message. Adding to dead letter queue...',
            err,
          )
          await this.addMessageToDlq(message)
        }
      },
    })
  }

  private async addMessageToDlq(message: KafkaMessage) {
    const kafkaDeadLetterQueue = new KafkaDeadLetterQueueEntity({
      topic: this.topic.topic as string,
      value: message.value,
    })
    await this.repository.save(kafkaDeadLetterQueue)
  }

  async connect() {
    // try {
    //   await this.createTopic(this.topic.topic as string)
    // } catch (err) {
    //   console.log({ err })
    // }

    try {
      await this.consumer.connect()
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err)
      await sleep(5000)
      await this.connect()
    }
  }

  async disconnect() {
    await this.consumer.disconnect()
  }
}
