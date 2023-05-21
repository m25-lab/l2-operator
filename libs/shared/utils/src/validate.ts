import { ethers } from 'ethers'

export const validatePhoneNumber = (phone: string): boolean => {
  let isValid = false
  const arrStartWith = ['01', '03', '05', '07', '08', '09']
  const startsWith = phone.substring(0, 2)

  if (arrStartWith.indexOf(startsWith) > -1) {
    if (phone.length === 10) {
      isValid = new RegExp(/(^0[2-9]\d{8}$)/).test(phone)
    } else if (phone.length === 11) {
      isValid = new RegExp(/(^01\d{9}$)/).test(phone)
    }
  }

  return isValid
}

export const validationEthAddress = (address: string): boolean => {
  return ethers.utils.isAddress(address)
}

export class ColumnNumericTransformer {
  to(data: number): number {
    return data
  }
  from(data: string): number {
    return parseFloat(data)
  }
}
