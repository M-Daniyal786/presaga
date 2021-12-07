import { RPC_URL } from '../config/network'
import {
  getConditionalTokenContract,
  getERC20Contract,
  getMarketMakerContract,
} from '../utils/contracts'
import {
  CTCONTRACT,
  NETWORK,
  COLLATERALTOKENCONTRACT,
  FPMMFACTORYCONTRACT,
  BYTES32ZERO,
  YESINDEX,
} from '../config/network'
import { getAccount } from './account'
import { newtonRaphson } from '../utils/newton-raphson-method'
let web3: any

const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

export const addFunding = async (amount: string, mmAddress: string) => {
  const tokenContract = getERC20Contract()
  const mmContract = getMarketMakerContract(mmAddress)
  const currentAccount = await getAccount()
  const convertedAmount = web3.utils.toWei(amount.toString())
  return tokenContract.methods
    .approve(mmContract._address, convertedAmount)
    .estimateGas({ from: currentAccount })
    .then((gasEstimate: number) => {
      return tokenContract.methods
        .approve(mmContract._address, convertedAmount)
        .send({ from: currentAccount, gas: gasEstimate })
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
            .addFunding(convertedAmount, [])
            .estimateGas({ from: currentAccount })
            .then((gasEstimate: number) => {
              return mmContract.methods
                .addFunding(convertedAmount, [])
                .send({ from: currentAccount, gas: gasEstimate })
                .on('receipt', function (receipt: any) {
                  new Promise((resolve, reject) => {
                    resolve(receipt)
                  })
                })
                .on(
                  'error',

                  function (error: any) {
                    if (
                      error.message.includes(
                        'User denied transaction signature'
                      )
                    ) {
                      new Promise((resolve) => {
                        resolve('User denied transaction signature')
                      })
                    }
                  }
                )
            })
        })
    })
}

export const removeFunding = async (amount: string, mmAddress: string) => {
  const ctcontract = getConditionalTokenContract()
  const mmContract = getMarketMakerContract(mmAddress)
  const currentAccount = await getAccount()
  const convertedAmount = web3.utils.toWei(amount.toString())
  // Get the shares back from the market maker
  return mmContract.methods
    .removeFunding(convertedAmount)
    .estimateGas({ from: currentAccount })
    .then((gasEstimate: number) => {
      return mmContract.methods
        .removeFunding(convertedAmount)
        .send({ from: currentAccount, gas: gasEstimate })
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
        .then((receipt: any) => {
          // Get the conditionId from the marketMaker itself avoids errors
          return mmContract.methods
            .conditionIds(0)
            .call()
            .then((conditionId: any) => {
              // Convert the shares back to collateral in the CT contract
              const basicPartition = [1, 2] // See https://docs.gnosis.io/conditionaltokens/docs/ctftutorial07/
              return ctcontract.methods
                .mergePositions(
                  COLLATERALTOKENCONTRACT,
                  BYTES32ZERO,
                  conditionId,
                  basicPartition,
                  convertedAmount
                )
                .estimateGas({ from: currentAccount })
                .then((gasEstimate: number) => {
                  return ctcontract.methods
                    .mergePositions(
                      COLLATERALTOKENCONTRACT,
                      BYTES32ZERO,
                      conditionId,
                      basicPartition,
                      convertedAmount
                    )
                    .send({ from: currentAccount, gas: gasEstimate })
                    .on('receipt', function (receipt: any) {
                      new Promise((resolve, reject) => {
                        resolve(receipt)
                      })
                    })
                    .on(
                      'error',

                      function (error: any) {
                        if (
                          error.message.includes(
                            'User denied transaction signature'
                          )
                        ) {
                          new Promise((resolve) => {
                            resolve('User denied transaction signature')
                          })
                        }
                      }
                    )
                })
            })
        })
    })
}
