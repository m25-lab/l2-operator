import { Repository } from 'typeorm'

export class BaseService<T, R extends Repository<T>> {
  protected readonly repository: R

  constructor(repository: R) {
    this.repository = repository
  }
}
