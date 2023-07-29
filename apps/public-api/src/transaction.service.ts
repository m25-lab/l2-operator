import { ethers } from 'ethers'

export class SwapTransaction {
  accountIndex: number
  buy: boolean
  nativeValue: ethers.BigNumber
  tokenValue: ethers.BigNumber
  compressNativeValue: string
  compressTokenValue: string
  signature: string
  price: number
  txid: string
  nonce: number
  immediateStateRoot: string

  constructor(
    _nonce: number,
    _accountIndex: number,
    _buy: boolean,
    _nativeValue: string,
    _tokenValue: string,
  ) {
    this.nonce = _nonce
    this.accountIndex = _accountIndex
    this.buy = _buy
    this.signature = '0x'
    this.compressNativeValue = '0x' + _nativeValue
    this.compressTokenValue = '0x' + _tokenValue

    //6 bytes for number
    //2 bytes for power of 10
    this.nativeValue = ethers.BigNumber.from(
      '0x' + _nativeValue.slice(0, 6),
    ).mul(ethers.BigNumber.from('10').pow('0x' + _nativeValue.slice(6, 8)))

    this.tokenValue = ethers.BigNumber.from('0x' + _tokenValue.slice(0, 6)).mul(
      ethers.BigNumber.from('10').pow('0x' + _tokenValue.slice(6, 8)),
    )

    this.price =
      this.nativeValue.mul(100000).div(this.tokenValue).toNumber() / 100000

    this.immediateStateRoot = '0x00000000000000000000000000000000'
    this.txid = this.generateTxid()
  }

  updateSignature(signature: string) {
    this.signature = signature
  }

  toHex(): string {
    return (
      '0x01' +
      ethers.utils
        .hexZeroPad(ethers.utils.hexlify(this.accountIndex), 4)
        .slice(2) +
      (this.buy ? '01' : '00') +
      this.compressNativeValue.slice(2) +
      this.compressTokenValue.slice(2) +
      this.immediateStateRoot.slice(2)
    )
  }

  generateTxid(): string {
    console.log('TxID chuaw Hash')
    console.log(
      '0x' +
        ethers.utils.hexZeroPad(ethers.utils.hexlify(this.nonce), 3).slice(2) +
        ethers.utils
          .hexZeroPad(ethers.utils.hexlify(this.accountIndex), 4)
          .slice(2) +
        (this.buy ? '01' : '00') +
        this.compressNativeValue.slice(2) +
        this.compressTokenValue.slice(2),
    )

    return ethers.utils.keccak256(
      '0x' +
        ethers.utils.hexZeroPad(ethers.utils.hexlify(this.nonce), 3).slice(2) +
        ethers.utils
          .hexZeroPad(ethers.utils.hexlify(this.accountIndex), 4)
          .slice(2) +
        (this.buy ? '01' : '00') +
        this.compressNativeValue.slice(2) +
        this.compressTokenValue.slice(2),
    )
  }

  toJson(): any {
    return {
      nonce: this.nonce,
      accountIndex: this.accountIndex,
      buy: this.buy,
      nativeValue: this.nativeValue.toString(),
      tokenValue: this.tokenValue.toString(),
      signature: this.signature,
      price: this.price,
      txid: this.txid,
    }
  }
}

export class SwapTransactionBatch {
  batch: Array<SwapTransaction>
  root: string

  constructor() {
    this.batch = []
  }

  toHex(): string {
    return '0x' + this.batch.map((tx) => tx.toHex().slice(2)).join('')
  }

  getTransaction(txid: string): SwapTransaction {
    return this.batch.find((tx) => tx.txid === txid)
  }

  toJson(): any {
    return {
      batch: this.batch.map((tx) => tx.toJson()),
      root: this.root,
    }
  }

  push(tx: SwapTransaction) {
    this.batch.push(tx)
  }

  remove(txid: string) {
    this.batch = this.batch.filter((tx) => tx.txid !== txid)
  }

  hash(): string {
    return ethers.utils.keccak256(this.toHex())
  }
}
