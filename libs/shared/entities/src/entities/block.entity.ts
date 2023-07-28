import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'blocks' })
export class BlockEntity {
  @PrimaryColumn()
  blockNumber: number

  @Column({ nullable: true })
  blockHash: string

  @Column({ nullable: true })
  version: number

  @Column({ nullable: true })
  stateSize: number

  @Column({ nullable: true })
  stateRoot: string

  @Column({ nullable: true })
  transactionsRoot: string

  @Column({ nullable: true })
  transactionsHash: string

  @Column({ nullable: true })
  hardTransactionsCount: number

  @Column({ nullable: true })
  isPending: boolean

  @Column({ type: 'json' })
  stateNode: any

  @Column({ type: 'json' })
  stateLeaf: any

  @Column({ nullable: true })
  submittedAt: number

  constructor(partial: Partial<BlockEntity>) {
    Object.assign(this, partial)
  }
}
