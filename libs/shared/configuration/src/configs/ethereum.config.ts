export const ethConfig = () => ({
  eth: {
    rpc: process.env.ETH_RPC,
    contract: process.env.ETH_CONTRACT,
    privateKey: process.env.ETH_PRIVATE_KEY,
    rollupDelay: process.env.ETH_ROLLUP_DELAY,
  },
})
