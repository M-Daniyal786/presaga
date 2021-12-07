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

export const Buy = async (
  outcomeIndex: string,
  amount: string,
  mmAddress: string
) => {
  const tokenContract = getERC20Contract()
  const mmContract = getMarketMakerContract(mmAddress)
  const currentAccount = await getAccount()

  return tokenContract.methods
    .approve(mmContract._address, web3.utils.toWei(amount))
    .send({ from: currentAccount })
    .on(
      'error',

      function (error: any) {
        if (error.message.includes('User denied transaction signature')) {
          new Promise((resolve) => {
            resolve('User denied transaction signature')
          })
        }
      }
    )
    .then((result: any) => {
      return mmContract.methods
        .buy(web3.utils.toWei(amount), outcomeIndex, 1) //1 is minimum tokens to buy
        .send({ from: currentAccount })
        .on('receipt', function (receipt: any) {
          new Promise((resolve) => {
            resolve(receipt)
          })
        })
        .on(
          'error',

          function (error: any) {
            if (error.message.includes('User denied transaction signature')) {
              new Promise((resolve) => {
                resolve('User denied transaction signature')
              })
            }
          }
        )
    })
}

export const Sell = async (
  outcomeIndex: string,
  returnAmount: string,
  mmAddress: string
) => {
  const currentAccount = await getAccount()
  const mmContract = getMarketMakerContract(mmAddress)
  const ctcontract = getConditionalTokenContract()

  return ctcontract.methods
    .setApprovalForAll(mmContract._address, true)
    .send({ from: currentAccount })
    .on(
      'error',

      function (error: any) {
        if (error.message.includes('User denied transaction signature')) {
          new Promise((resolve) => {
            resolve('User denied transaction signature')
          })
        }
      }
    )
    .then(() => {
      return mmContract.methods
        .sell(
          web3.utils.toWei(returnAmount),
          outcomeIndex,
          web3.utils.toWei(returnAmount) + web3.utils.toWei('1')
        )
        .send({ from: currentAccount })
        .on('receipt', function (receipt: any) {
          new Promise((resolve) => {
            resolve(receipt)
          })
        })
        .on(
          'error',

          function (error: any) {
            if (error.message.includes('User denied transaction signature')) {
              new Promise((resolve) => {
                resolve('User denied transaction signature')
              })
            }
          }
        )
    })
}

export const getMarketFee = async (mmAddress: string) => {
  const rinkebyAccount = await getAccount()
  const mmContract = getMarketMakerContract(mmAddress)

  return await mmContract.methods
    .fee()
    .call({ from: rinkebyAccount })
    .then((res: any) => {
      return web3.utils.fromWei(res) * 100
    })
}

export const calcSellCollateral = async (
  input: number,
  outcomeIndex: number,
  mmAddress: string,
  yesPositionID: string,
  noPositionID: string
) => {
  const mmContract = getMarketMakerContract(mmAddress)
  const ctcontract = getConditionalTokenContract()
  const fee = await getMarketFee(mmAddress)
  const currentAccount = await getAccount()
  return await ctcontract.methods
    .balanceOfBatch(
      [mmContract._address, mmContract._address],
      [noPositionID, yesPositionID]
    )
    .call({ from: currentAccount })
    .then((result: any) => {
      const balancesSMALL = result.map((x: number) => web3.utils.fromWei(x))
      let sellReserves = balancesSMALL[outcomeIndex]
      let otherReserves = balancesSMALL[Math.abs(outcomeIndex - 1)]

      function f(x: number) {
        return (
          sellReserves * otherReserves +
          (otherReserves - x) * x +
          (-sellReserves - input) * (otherReserves - x)
        )
      }

      const amount = newtonRaphson(f, 0)

      const feeAmount = 1 - fee / (100 - fee)

      return (amount * feeAmount * 1000000) / 1000000
    })
}

export const askFaucet = async () => {
  const faucet = getFaucetContract()
  const currentAccount = await getAccount()

  return await faucet.methods
    .askFaucet()
    .send({ from: currentAccount })
    .on('receipt', function (receipt: any) {
      new Promise((resolve) => {
        resolve(receipt)
      })
    })
    .on(
      'error',

      function (error: any) {
        if (error.message.includes('User denied transaction signature')) {
          new Promise((resolve) => {
            resolve('User denied transaction signature')
          })
        }
      }
    )
}

export const getWithdrawableFees = async (address: string) => {
  const marketContract = getMarketMakerContract(address)
  const account = await getAccount()

  return await marketContract.methods
    .feesWithdrawableBy(account)
    .call({ from: account })
    .then((res: any) => {
      return web3.utils.fromWei(res)
    })
}

export const widthDrawFees = async (address: string) => {
  const marketContract = getMarketMakerContract(address)
  const account = await getAccount()

  return await marketContract.methods
    .withdrawFees(account)
    .send({ from: account })
    .on('receipt', function (receipt: any) {
      new Promise((resolve) => {
        resolve(receipt)
      })
    })
    .on(
      'error',

      function (error: any) {
        if (error.message.includes('User denied transaction signature')) {
          new Promise((resolve) => {
            resolve('User denied transaction signature')
          })
        }
      }
    )
}
