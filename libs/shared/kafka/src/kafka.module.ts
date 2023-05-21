import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConsumerService } from './consumer.service'
import { KafkaDeadLetterQueueEntity } from './kafka-dead-letter-queue.entity'
import { ProducerService } from './producer.service'

@Module({
  imports: [TypeOrmModule.forFeature([KafkaDeadLetterQueueEntity])],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaSharedModule {}
