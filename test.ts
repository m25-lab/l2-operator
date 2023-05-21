//get balance of token
import { ethers } from 'ethers'
import { abi } from '@openzeppelin/contracts/build/contracts/ERC20.json'

const rpcProvider = 'https://rpc.doos.dev'

const provider = new ethers.providers.JsonRpcProvider(rpcProvider)

const contract = new ethers.Contract(
  '0xdC320309172AAb37Fb174BB9723483f137C38C64',
  abi,
  provider,
)

console.log(contract)

async function getBalance() {
  const balance = await contract.balanceOf(
    '0xfcf4d411b15288d7abe94e039d492c1b275ad792',
  )
  console.log(balance.toString())
}

getBalance()
