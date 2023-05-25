import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryColumn()
  id: number

  @Column()
  address: string

  @Column()
  nativeBalance: string

  @Column()
  tokenBalance: string

  @Column()
  nonce: number

  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial)
  }
}
