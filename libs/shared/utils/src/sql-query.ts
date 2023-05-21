import { FindManyOptions, Like } from 'typeorm'

export const mapQueriesToFindManyOptions = <Entity>(
  query,
  ...searchColumns: string[]
): FindManyOptions<Entity> => {
  const options: FindManyOptions<Entity> = {}
  if (!query) {
    return options
  }

  const {
    page,
    offset,
    limit,
    orderBy,
    orderType,
    search,
    searches,
    ...filters
  } = query

  if (limit) {
    options.take = limit
  }
  // paging
  if (offset) {
    options.skip = offset
    options.take = options.take || 20
  }

  if (page) {
    options.skip = (page - 1) * options.take
    options.take = options.take || 20
  }

  // ordering
  if (orderBy && orderType) {
    options.order = {}
    options.order[orderBy] = (orderType as string).toUpperCase()
  }

  // filtering
  if (Object.keys(filters).length !== 0) {
    options.where = [
      {
        ...filters,
      },
    ]
  }

  // searching
  if (search && searchColumns?.length) {
    const filters = (options.where as any[])?.length
      ? (options.where as any[])[0]
      : {}
    options.where = []
    const likeSearch = '%' + search + '%'

    searchColumns.forEach((column) => {
      const condition: any = {}
      condition[column] = Like(likeSearch)
      ;(options.where as any[]).push({ ...filters, ...condition })
    })
  }

  if (searches?.length > 0) {
    const filters = (options.where as any[])?.length
      ? (options.where as any[])[0]
      : {}
    options.where = []

    searches.forEach((searchItem) => {
      const likeSearch = '%' + searchItem.value + '%'

      ;(options.where as any[]).push({
        ...filters,
        ...{
          [searchItem.columnName]: Like(likeSearch),
        },
      })
    })
  }

  return options
}

export const buildSqlWhereQuery = (
  rawSqlQuery: string,
  query: string,
): string => {
  const hasWhereClause = query.toLowerCase().includes('where')

  if (hasWhereClause) {
    rawSqlQuery += ` AND ${query}`
  } else {
    rawSqlQuery += ` WHERE ${query}`
  }

  return rawSqlQuery
}
