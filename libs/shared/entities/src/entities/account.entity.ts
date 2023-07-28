import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryColumn()
  id: number

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  blsPubkey: string

  @Column({ nullable: true })
  nativeBalance: string

  @Column({ nullable: true })
  tokenBalance: string

  @Column({ nullable: true })
  nonce: number

  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial)
  }
}
