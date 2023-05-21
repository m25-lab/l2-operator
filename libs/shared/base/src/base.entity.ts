import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { momentTZ } from '@lib/shared/utils'

export abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @BeforeInsert()
  setDefaultBeforeInsert() {
    this.createdAt = momentTZ().format('YYYY-MM-DD HH:mm:ss')
    this.updatedAt = momentTZ().format('YYYY-MM-DD HH:mm:ss')
  }

  @BeforeUpdate()
  setDefaultBeforeUpdate() {
    this.updatedAt = momentTZ().format('YYYY-MM-DD HH:mm:ss')
  }
}
