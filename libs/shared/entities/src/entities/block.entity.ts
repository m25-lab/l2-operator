import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'blocks' })
export class BlockEntity {
  @PrimaryColumn()
  blockNumber: number

  @Column()
  blockHash: string

  @Column()
  version: number

  @Column()
  stateSize: number

  @Column()
  stateRoot: string

  @Column()
  transactionsRoot: string

  @Column()
  transactionsHash: string

  @Column()
  hardTransactionsCount: number

  @Column()
  isPending: boolean

  @Column({ type: 'json' })
  stateNode: any

  @Column({ type: 'json' })
  stateLeaf: any

  @Column()
  submittedAt: number

  constructor(partial: Partial<BlockEntity>) {
    Object.assign(this, partial)
  }
}
