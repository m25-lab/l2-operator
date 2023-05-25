import { ethers } from 'ethers'

import { SwapTransactionBatch } from './transaction.service'

type Order = {
  id: string
  accountIndex: number
  price: number
  quantity: ethers.BigNumber
}
type Change = {
  accountIndex: number
  isBuy: boolean
  nativeValue: ethers.BigNumber
  tokenValue: ethers.BigNumber
}
export class OrderBook {
  bids: Array<Order>
  asks: Array<Order>
  changes: Array<Change>

  constructor(batch: SwapTransactionBatch) {
    this.bids = []
    this.asks = []
    this.changes = []

    for (let i = 0; i < batch.batch.length; i++) {
      const tx = batch.batch[i]
      const order = {
        id: tx.txid,
        accountIndex: tx.accountIndex,
        price: tx.price,
        quantity: ethers.BigNumber.from(tx.tokenValue),
      }

      if (tx.buy) {
        this.bids.push(order)
      } else {
        this.asks.push(order)
      }
    }
  }

  async match(): Promise<{
    executedTrades: Set<string>
    changes: Array<Change>
  }> {
    const executedTrades: Set<string> = new Set()

    for (const bid of this.bids) {
      for (const ask of this.asks) {
        if (
          bid.price >= ask.price &&
          bid.quantity.gt(0) &&
          ask.quantity.gt(0)
        ) {
          const tradeSize = bid.quantity.lt(ask.quantity)
            ? bid.quantity
            : ask.quantity

          if (tradeSize.eq(0)) {
            continue
          }

          executedTrades.add(bid.id)
          executedTrades.add(ask.id)

          bid.quantity = bid.quantity.sub(tradeSize)
          ask.quantity = ask.quantity.sub(tradeSize)

          this.changes.push({
            accountIndex: bid.accountIndex,
            isBuy: true,
            nativeValue: tradeSize.mul(ethers.BigNumber.from(bid.price)),
            tokenValue: tradeSize,
          })

          this.changes.push({
            accountIndex: ask.accountIndex,
            isBuy: false,
            nativeValue: tradeSize.mul(ethers.BigNumber.from(ask.price)),
            tokenValue: tradeSize,
          })

          if (bid.quantity.eq(0)) {
            this.bids = this.bids.filter((b) => b.id !== bid.id)
          }

          if (ask.quantity.eq(0)) {
            this.asks = this.asks.filter((a) => a.id !== ask.id)
          }
        }
      }
    }

    return {
      executedTrades,
      changes: this.changes,
    }
  }
}
