import { IsOptional, Length, MaxLength, MinLength } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@lib/shared/base'
import { ETH_ADDRESS_LEN } from '@lib/shared/constants'

@Entity({ name: 'accounts' })
export class AccountEntity extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  userId: string

  @Column({ nullable: true })
  @MaxLength(255)
  name: string

  @Column()
  @MaxLength(ETH_ADDRESS_LEN)
  @MinLength(ETH_ADDRESS_LEN)
  address: string

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description: string

  constructor(partial: Partial<AccountEntity>) {
    super()
    Object.assign(this, partial)
  }
}
