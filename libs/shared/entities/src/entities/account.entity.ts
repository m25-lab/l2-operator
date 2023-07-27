import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryColumn()
  id: number

  @Column({ unique: true })
  address: string

  @Column({ unique: true })
  blsPubkey: string

  @Column({ unique: true })
  nativeBalance: string

  @Column({ unique: true })
  tokenBalance: string

  @Column({ unique: true })
  nonce: number

  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial)
  }
}
