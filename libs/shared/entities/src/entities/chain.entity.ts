import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'chains' })
export class ChainEntity extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  orchestrateId: string

  @Column()
  name: string

  @Column()
  chain: string

  @Column({ nullable: true })
  logo: string

  @Column({ nullable: true })
  multicallAddress: string

  @Column({ type: 'json' })
  rpcUrls: string[]

  @Column()
  isPrivate: boolean

  constructor(partial: Partial<ChainEntity>) {
    super()
    Object.assign(this, partial)
  }
}
