import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOkResponse } from '@lib/shared/decorators'

import { PublicApiService } from './public-api.service'

@Controller()
export class PublicApiController {
  constructor(private readonly service: PublicApiService) {}

  @Post('tx')
  @ApiOkResponse()
  async submitTx(@Body() body: any): Promise<boolean> {
    try {
      await this.service.sendTransaction(body['tx'])
    } catch (e) {
      console.log(e)

      return false
    }
  }

  @Get('mempool')
  @ApiOkResponse()
  async getTxBatch(): Promise<any> {
    try {
      return this.service.getMempool()
    } catch (e) {
      console.log(e)

      return false
    }
  }

  @Get('orderbook')
  @ApiOkResponse()
  async getOrderBook(): Promise<any> {
    try {
      return this.service.submitBatch()
    } catch (e) {
      console.log(e)

      return false
    }
  }

  @Get('account/:id')
  @ApiOkResponse()
  async getAccount(@Param('id') id: string): Promise<any> {
    try {
      return this.service.getAccount(parseInt(id))
    } catch (e) {
      console.log(e)
    }
  }

  @Get('state-proof')
  @ApiOkResponse()
  async getStateProof(
    @Query('block') blockNumber: string,
    @Query('account') accountIndex: string,
  ): Promise<any> {
    try {
      return this.service.getStateProof(
        parseInt(blockNumber),
        parseInt(accountIndex),
      )
    } catch (e) {
      console.log(e)

      return false
    }
  }
}
