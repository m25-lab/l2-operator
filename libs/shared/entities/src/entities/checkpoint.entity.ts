import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'checkpoints' })
export class CheckpointEntity {
  @PrimaryColumn()
  key: string

  @Column()
  value: number

  constructor(partial: Partial<CheckpointEntity>) {
    Object.assign(this, partial)
  }
}
