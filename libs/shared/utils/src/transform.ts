import { isEmpty } from 'lodash'

type OrderBy = 'ASC' | 'DESC'

export const toArray = <T = any>(data?: T | T[]): T[] => {
  if (!data) {
    return []
  }

  return Array.isArray(data) ? data : [data]
}

export const getNestedChildren = (
  data: any[],
  parentId: number | null,
): any[] => {
  const out: any = []

  for (const i in data) {
    const itemParentId = data[i].parentId ?? null
    if (itemParentId === parentId) {
      const children = getNestedChildren(data, data[i].id)

      const dataPush: any = {
        ...data[i],
      }

      if (children.length) {
        dataPush.children = children
      }

      out.push(dataPush)
    }
  }

  return out
}

export const toSlug = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD') // chuyển về dạng tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu tổ hợp
    .replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D')) // chuyển chữ đ/Đ thành d/D
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-') // separator
}

export const getAllChildren = (data: any[], parentId: number): any[] => {
  const children = []
  // grab the children
  const posts = []
  for (const item of data) {
    if (item.parentId === parentId) {
      posts.push(item)
    }
  }

  // now grab the grand children
  for (const child of posts) {
    // recursion!! hurrah
    const gChildren = getAllChildren(data, child.id)

    // merge the grand children into the children array
    if (!isEmpty(gChildren)) {
      children.push(...gChildren)
    }
  }

  // merge in the direct descendants we found earlier
  children.push(...posts)

  return children
}

export const titleCase = (value: string) => {
  return value
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')
}

export const htmlToText = (htmlString: string): string => {
  return htmlString.replace(/<[^>]+>/g, '').replace(/\n/g, ' ')
}

export const parseOrderByFields = (
  value = '',
): Array<{ orderBy: string; orderType: OrderBy }> => {
  const valuesArray = value === '' ? [] : value.split(',')

  const orderArray = valuesArray.map((orderValue) => {
    if (orderValue.charAt(0) === '-') {
      return {
        orderBy: orderValue.substring(1),
        orderType: 'DESC' as OrderBy,
      }
    }

    return {
      orderBy: orderValue.trim().substring(1),
      orderType: 'ASC' as OrderBy,
    }
  })

  return orderArray
}

export const convertNewPhonePrefix = (phone: string): string => {
  const NEW_PHONE_PREFIX = {
    // VINAPHONE
    '0123': '083',
    '0124': '084',
    '0125': '085',
    '0127': '081',
    '0129': '082',
    // MOBIFONE
    '0120': '070',
    '0121': '079',
    '0122': '077',
    '0126': '076',
    '0128': '078',
    // VIETTEL
    '0162': '032',
    '0163': '033',
    '0164': '034',
    '0165': '035',
    '0166': '036',
    '0167': '037',
    '0168': '038',
    '0169': '039',
    // VIETNAMOBILE
    '0186': '056',
    '0188': '058',
    // GMOBILE
    '0199': '059',
  }

  const oldPrefix = phone.substring(0, 4)

  const newPrefix = NEW_PHONE_PREFIX[oldPrefix]
  if (!newPrefix) {
    return phone
  }

  const tail = phone.substring(4, 11)
  phone = newPrefix + tail

  return phone
}

export const convertCamelCaseToSnakeCase = (obj: any): any => {
  if (obj === null) {
    return null
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertCamelCaseToSnakeCase(item))
  }

  if (typeof obj === 'object') {
    const newObj: any = {}
    for (const key in obj) {
      const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
      newObj[newKey] = convertCamelCaseToSnakeCase(obj[key])
    }

    return newObj
  }

  return obj
}

export const parseSortQuery = (
  sort: string,
): {
  field: string
  order: 'ASC' | 'DESC'
} | null => {
  const jSort = JSON.parse(sort)
  if (!jSort.field) {
    return null
  }
  if (!jSort.order || !['ASC', 'DESC'].includes(jSort.order.toUpperCase())) {
    return null
  }

  return {
    field: jSort.field,
    order: jSort.order.toUpperCase() as 'ASC' | 'DESC',
  }
}
