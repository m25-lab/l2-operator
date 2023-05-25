import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOkResponse } from '@lib/shared/decorators'
import { ActionResponse } from '@lib/shared/utils'

import { PublicApiService } from './public-api.service'

@Controller()
export class PublicApiController {
  constructor(private readonly service: PublicApiService) {}

  @Post('tx')
  @ApiOkResponse()
  async submitTx(@Body() body: any) {
    await this.service.sendTransaction(body['tx'])

    return new ActionResponse<any>({})
  }

  @Get('mempool')
  @ApiOkResponse()
  async getTxBatch() {
    const data = this.service.getMempool()

    return new ActionResponse<any>({
      data,
    })
  }

  @Get('execute')
  @ApiOkResponse()
  async getOrderBook() {
    await this.service.submitBatch()

    return new ActionResponse<any>({})
  }

  @Get('account/:id')
  @ApiOkResponse()
  async getAccount(@Param('id') id: string) {
    const data = await this.service.getAccount(parseInt(id))

    return new ActionResponse<any>({
      data,
    })
  }

  @Get('state-proof')
  @ApiOkResponse()
  async getStateProof(
    @Query('block') blockNumber: string,
    @Query('account') accountIndex: string,
  ) {
    const data = await this.service.getStateProof(
      parseInt(blockNumber),
      parseInt(accountIndex),
    )

    return new ActionResponse<any>({
      data,
    })
  }
}
