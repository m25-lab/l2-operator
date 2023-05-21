import { applyDecorators, Type } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse as ApiOkResponseSwagger,
  getSchemaPath,
} from '@nestjs/swagger'
import { ActionResponse } from '@lib/shared/utils'

export const ApiOkResponse = <DataDto extends Type<unknown>>(
  dataDto?: DataDto,
) => {
  if (dataDto) {
    return applyDecorators(
      ApiExtraModels(ActionResponse, dataDto),
      ApiOkResponseSwagger({
        schema: {
          allOf: [
            { $ref: getSchemaPath(ActionResponse) },
            {
              properties: {
                data: { $ref: getSchemaPath(dataDto) },
              },
            },
          ],
        },
      }),
    )
  }

  return applyDecorators(
    ApiOkResponseSwagger({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ActionResponse) },
          {
            properties: {
              data: null,
            },
          },
        ],
      },
    }),
  )
}
