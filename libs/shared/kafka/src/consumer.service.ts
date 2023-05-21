import { Injectable, OnApplicationShutdown } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from 'kafkajs'
import { Repository } from 'typeorm'
import { BaseService } from '@lib/shared/base'

import { Consumer } from './interface/consumer.interface'
import { KafkaDeadLetterQueueEntity } from './kafka-dead-letter-queue.entity'
import { KafkajsConsumer } from './kafkajs.consumer'

interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopic
  config: ConsumerConfig
  onMessage: (message: KafkaMessage) => Promise<void>
}

@Injectable()
export class ConsumerService
  extends BaseService<
    KafkaDeadLetterQueueEntity,
    Repository<KafkaDeadLetterQueueEntity>
  >
  implements OnApplicationShutdown
{
  private readonly consumers: Consumer[] = []

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(KafkaDeadLetterQueueEntity)
    repository: Repository<KafkaDeadLetterQueueEntity>,
  ) {
    super(repository)
  }

  async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = new KafkajsConsumer(
      topic,
      this.repository,
      config,
      this.configService.get('kafka.brokers').split(','),
      this.configService,
    )
    await consumer.connect()
    await consumer.consume(onMessage)
    this.consumers.push(consumer)
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect()
    }
  }
}
