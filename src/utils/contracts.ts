import factoryABI from '../abis/factory.json'
import marketABI from '../abis/marketMaker.json'
import erc20ABI from '../abis/erc20.json'
import faucetABI from '../abis/faucet.json'
import conditionalTokenABI from '../abis/conditionalToken.json'
import {
  factoryAddress,
  condtionalToken,
  COLLATERALTOKENCONTRACT,
  FAUCET,
} from '../config/network'
import { RPC_URL } from '../config/network'

let web3: any
/* 
const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL)) */

if (typeof window !== 'undefined' && window.ethereum) {
  // eslint-disable-next-line global-require

  const Web3 = require('web3')
  web3 = new Web3(window.ethereum)
  window.web3 = new Web3(window.ethereum)

  window.web3.eth.net.getId().then((res) => {
    if (res != 421611) {
      web3 = new Web3(
        new Web3.providers.HttpProvider('https://rinkeby.arbitrum.io/rpc')
      )
    }
  })
} /* else {
  const Web3 = require('web3')
  web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.arbitrum.io/rpc')
  ) */

export const getMarketMakerContract = (address: string) => {
  return new web3.eth.Contract(marketABI, address)
}

export const getConditionalTokenContract = () => {
  return new web3.eth.Contract(conditionalTokenABI, condtionalToken)
}
export const getERC20Contract = (): any => {
  return new web3.eth.Contract(erc20ABI, COLLATERALTOKENCONTRACT)
}
export const getFactoryContract = () => {
  return new web3.eth.Contract(factoryABI, factoryAddress)
}

export const getFaucetContract = () => {
  return new web3.eth.Contract(faucetABI, FAUCET)
}
