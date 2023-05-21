import DN from 'bignumber.js'
import { BigNumber, ethers } from 'ethers'
import _isNil from 'lodash/isNil'
import moment from 'moment'
import momentTimeZone from 'moment-timezone'
import { appConfig } from '@lib/shared/configuration'

import { convertNewPhonePrefix } from './transform'

export const numberFormat = (value: number | null) => {
  if (_isNil(value)) {
    return ''
  }

  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const currencyFormat = (value: number | null) => {
  if (_isNil(value)) {
    return '0$'
  }

  return `${numberFormat(value)}$`
}

export const dateToString = (time: string | Date) => {
  return time ? momentTZ(time).format('DD/MM/YYYY HH:mm:ss') : ''
}

export const dateFormat = (
  dateString: string | Date,
  formatType = 'DD/MM/YYYY',
) => {
  if (!dateString) {
    return ''
  }

  return momentTZ(dateString).format(formatType)
}

export const countDecimalDigits = (value: number): number => {
  if (Math.floor(value) === value) {
    return 0
  }

  const splitNumber = value.toString().split('.')

  return splitNumber?.[1]?.length ?? 0
}

export const formatPercent = (number: number, decimalPlace = 2): string => {
  const totalDecimalDigits = countDecimalDigits(number)

  if (totalDecimalDigits === 0) {
    return `${number}%`
  }

  const factorOfTen = Math.pow(10, decimalPlace)
  const nextPercent = Math.round(number * factorOfTen) / factorOfTen

  return `${nextPercent}%`.replace('.', ',')
}

export const momentTZ = (...args) => {
  return momentTimeZone(...args).tz(appConfig().localTimezone)
}

export const formatPhone = (phone: string): string => {
  let newPhone = phone
  if (
    typeof newPhone === 'string' &&
    (newPhone.startsWith('+84') || newPhone.startsWith('0'))
  ) {
    if (newPhone.startsWith('+84')) {
      newPhone = `0${newPhone.substring(3, newPhone.length)}`
    }

    if (newPhone.length === 11) {
      newPhone = convertNewPhonePrefix(newPhone)
    }

    return newPhone
  }

  if (newPhone.length === 11) {
    newPhone = convertNewPhonePrefix(newPhone)
  }
  if (!Number.isNaN(+newPhone) && newPhone !== '') {
    newPhone = `0${newPhone.toString()}`
    if (newPhone.length == 11) {
      newPhone = convertNewPhonePrefix(newPhone)
    }

    return newPhone
  }

  return newPhone
}

export function convertBigNumberToHex(big: BigNumber): string {
  const hexString = big.toHexString()
  if (hexString.startsWith('0x0')) {
    return '0x' + hexString.slice(3, hexString.length)
  }

  return hexString
}

export function convertToBigNumber(num: string, decimals = 18) {
  return ethers.utils.parseUnits(num, decimals)
}

export function formatEthAddress(address: string) {
  return ethers.utils.getAddress(address.toLowerCase())
}
