import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'blocks' })
export class BlockEntity {
  @PrimaryColumn()
  blockNumber: number

  @Column({ unique: true })
  blockHash: string

  @Column({ unique: true })
  version: number

  @Column({ unique: true })
  stateSize: number

  @Column({ unique: true })
  stateRoot: string

  @Column({ unique: true })
  transactionsRoot: string

  @Column({ unique: true })
  transactionsHash: string

  @Column({ unique: true })
  hardTransactionsCount: number

  @Column({ unique: true })
  isPending: boolean

  @Column({ type: 'json' })
  stateNode: any

  @Column({ type: 'json' })
  stateLeaf: any

  @Column({ unique: true })
  submittedAt: number

  constructor(partial: Partial<BlockEntity>) {
    Object.assign(this, partial)
  }
}
