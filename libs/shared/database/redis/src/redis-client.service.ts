import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { h32 } from 'xxhashjs'
import { InjectRedis } from '@liaoliaots/nestjs-redis'

@Injectable()
export class RedisClientService {
  constructor(@InjectRedis() readonly redisClient /* : Redis */) {}
  createKey(prefix: string, param?: string): string {
    if (!param) return prefix
    const hash = h32(param, 0xbadbae).toString(16)

    return `${prefix}:${hash}`
  }

  async getValue(key: string): Promise<string> {
    const result = await this.redisClient.get(key)

    return result
  }

  async setValue(key: string, value: string): Promise<boolean> {
    const result = await this.redisClient.set(key, value)

    return result === 'OK'
  }

  async setValueWithExpiry(
    key: string,
    value: string,
    seconds = 60,
  ): Promise<boolean> {
    const result = await this.redisClient.set(key, value, 'EX', seconds)

    return result === 'OK'
  }

  async deleteKey(key: string): Promise<boolean> {
    const result = await this.redisClient.del(key)

    return result > 0
  }

  async incrementValue(key: string): Promise<number> {
    const result = await this.redisClient.incr(key)

    return result
  }
}
