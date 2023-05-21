import { Injectable, OnApplicationShutdown } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Message } from 'kafkajs'

import { Producer } from './interface/producer.interface'
import { KafkajsProducer } from './kafkajs.producer'

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, Producer>()

  constructor(private readonly configService: ConfigService) {}

  async produce(topic: string, message: Message) {
    const producer = await this.getProducer(topic)
    await producer.produce(message)
  }

  private async getProducer(topic: string) {
    let producer = this.producers.get(topic)
    if (!producer) {
      producer = new KafkajsProducer(
        topic,
        this.configService.get('kafka.brokers').split(','),
        this.configService,
      )
      await producer.connect()
      this.producers.set(topic, producer)
    }

    return producer
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect()
    }
  }
}
