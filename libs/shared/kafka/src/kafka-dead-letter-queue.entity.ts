import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'kafka_dead_letter_queues' })
export class KafkaDeadLetterQueueEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  topic: string

  @Column({
    type: 'jsonb',
  })
  value: any

  constructor(partial: Partial<KafkaDeadLetterQueueEntity>) {
    super()
    Object.assign(this, partial)
  }
}
