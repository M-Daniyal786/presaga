import { RPC_URL } from '../config/network'
import {
  getConditionalTokenContract,
  getERC20Contract,
  getFaucetContract,
  getMarketMakerContract,
} from '../utils/contracts'
import { getAccount } from './account'
import { newtonRaphson } from '../utils/newton-raphson-method'

let web3: any

/* const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
 */

const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

export const reportPayouts = async (questionId: string, payouts: number[]) => {
  const condionalTokenContract = getConditionalTokenContract()
  const account = getAccount()
  return condionalTokenContract.methods
    .reportPayouts(questionId, payouts)
    .estimateGas({ from: account })
    .then((gasEstimate: number) => {
      return condionalTokenContract.methods
        .reportPayouts(questionId, payouts)
        .send({ from: account, gas: gasEstimate })
    })
}

export const closeMarket = async (address: string) => {
  const marketContract = getMarketMakerContract(address)
  const account = getAccount()
  return marketContract.methods.changeMarketState().send({ from: account })
}

export const setMarketEndDate = async (_endDate: string, address: string) => {
  const marketContract = getMarketMakerContract(address)
  const account = getAccount()
  return marketContract.methods
    .setMarketEndDate(_endDate)
    .send({ from: account })
}

export const setMarketStateToResolved = async (address: string) => {
  const marketContract = getMarketMakerContract(address)
  const account = getAccount()
  return marketContract.methods
    .setMarketStateToResolved()
    .send({ from: '0xaB013Eb44D28483ab371E460e66Fbf6628AE60c5' })
}
