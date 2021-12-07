import { BYTES32ZERO, COLLATERALTOKENCONTRACT } from './../config/network'
import { getCollectionIds } from './conditionalTokens'
import { getConditionalTokenContract } from './../utils/contracts'
import { getFactoryContract, getMarketMakerContract } from '../utils/contracts'
import { getAccount } from './account'
import { NOINDEX, YESINDEX } from '../config/network'
import { RPC_URL } from '../config/network'
import { getMarketFee } from './trade'

let web3: any
const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

export const getAllMarkets = async function (web3: any): Promise<any> {
  //gets a single market for now..
  var markets: any = []
  const factory = getFactoryContract()

  const account = await getAccount()
  const numberOfmarkets = await factory.methods
    .getMarketsLength()
    .call({ from: account })

  for (let i = 0; i < numberOfmarkets; i++) {
    const marketsAddresses = await factory.methods
      .markets(i)
      .call({ from: account })
    const market = getMarketMakerContract(marketsAddresses)
    const conditionalToken = getConditionalTokenContract()
    const closed = await market.methods.closed().call({ from: account })
    const resolved = await market.methods.resolved().call({ from: account })
    const question = await market.methods.question().call({ from: account })
    const fee = await getMarketFee(marketsAddresses)
    const conditionId = await market.methods
      .conditionIds(0)
      .call({ from: account })
    const liquidity = await market.methods.totalSupply().call({ from: account })
    var accountLiquidity: string
    var shares: conditionT

    type conditionT = {
      yes: string
      no: string
    }
    let position = await getCollectionIds(
      web3,
      conditionId,
      COLLATERALTOKENCONTRACT
    ).then(async (value) => {
      const prices = await totalPrices(
        marketsAddresses,
        web3,
        value.yes,
        value.no
      )

      if (account) {
        accountLiquidity = await market.methods
          .balanceOf(account)
          .call({ from: account })
        shares = await conditionalToken.methods
          .balanceOfBatch([account, account], [value.no, value.yes])
          .call({ from: account })
      }

      markets.push({
        address: marketsAddresses,
        closed: closed,
        resolved: resolved,
        question: question,
        conditionId: conditionId,
        liquidity: web3.utils.fromWei(liquidity),
        yesSupply: prices[0].yesSupply,
        noSupply: prices[1].noSupply,
        yesPrice: prices[2].yesPrice,
        noPrice: prices[3].noPrice,
        accountLiquidity: web3.utils.fromWei(
          accountLiquidity?.toString() || '0'
        ),
        userShares: shares,
        yesPositionId: value.yes,
        noPositionId: value.no,
        fee: fee,
      })
    })
  }

  return markets
}

export const getSingleMarket = async function (
  web3: any,
  address: string
): Promise<any> {
  //gets a single market for now..
  var markets: any = []
  const factory = getFactoryContract()

  const account = await getAccount()
  const numberOfmarkets = await factory.methods
    .getMarketsLength()
    .call({ from: account })

  const market = getMarketMakerContract(address)
  const conditionalToken = getConditionalTokenContract()
  const closed = await market.methods.closed().call({ from: account })
  const resolved = await market.methods.resolved().call({ from: account })
  const question = await market.methods.question().call({ from: account })
  const fee = await getMarketFee(address)
  const conditionId = await market.methods
    .conditionIds(0)
    .call({ from: account })
  const liquidity = await market.methods.totalSupply().call({ from: account })
  var accountLiquidity: string
  var shares: conditionT

  type conditionT = {
    yes: string
    no: string
  }
  let position = await getCollectionIds(
    web3,
    conditionId,
    COLLATERALTOKENCONTRACT
  ).then(async (value) => {
    const prices = await totalPrices(address, web3, value.yes, value.no)

    if (account) {
      accountLiquidity = await market.methods
        .balanceOf(account)
        .call({ from: account })
      shares = await conditionalToken.methods
        .balanceOfBatch([account, account], [value.no, value.yes])
        .call({ from: account })
    }

    markets.push({
      address: address,
      closed: closed,
      resolved: resolved,
      question: question,
      conditionId: conditionId,
      liquidity: web3.utils.fromWei(liquidity),
      yesSupply: prices[0].yesSupply,
      noSupply: prices[1].noSupply,
      yesPrice: prices[2].yesPrice,
      noPrice: prices[3].noPrice,
      accountLiquidity: web3.utils.fromWei(accountLiquidity?.toString() || '0'),
      userShares: shares,
      yesPositionId: value.yes,
      noPositionId: value.no,
      fee: fee,
    })
  })

  return markets
}
export const getClosedMarkets = async function (): Promise<any> {
  return
}
export const getResolvedMarkets = async function (): Promise<any> {
  return
}

export const calcSharePrice = async (
  web3: any,
  outcomeIndex: number,
  liquidity: number,
  mmAddress: string
) => {
  const mmContract = getMarketMakerContract(mmAddress)
  const currentAccount = await getAccount()

  return mmContract.methods
    .calcBuyAmount(liquidity, outcomeIndex)
    .call({ from: currentAccount })
    .then((res: any) => {
      console.log(liquidity)
      console.log(web3.utils.fromWei(res))
      const value = web3.utils.fromWei(
        (liquidity / web3.utils.fromWei(res)).toString()
      )

      return (value * 100 - 1) / 100
    })
    .catch((error: any) => {
      return 'unknown value'
    })
}

export const totalPrices = async (
  mmAddress: string,
  web3: any,

  yesPositionID: string,
  noPositionID: string
) => {
  var resultObj: any = []
  const ctContract = getConditionalTokenContract()
  const rinkebyAccount = await getAccount()

  await ctContract.methods
    .totalSupply(yesPositionID)
    .call({ from: rinkebyAccount })
    .then((res: any) => {
      resultObj.push({
        yesSupply: web3.utils.fromWei(res),
      })
    })
  await ctContract.methods
    .totalSupply(noPositionID)
    .call({ from: rinkebyAccount })
    .then((res: any) => {
      resultObj.push({
        noSupply: web3.utils.fromWei(res),
      })
    })

  const oneShareAmount = web3.utils.toWei('1')

  await calcSharePrice(web3, YESINDEX, oneShareAmount, mmAddress)
    .then((res: any) => {
      resultObj.push({
        yesPrice: res,
      })
    })
    .catch((err) => {
      console.error(err)
    })

  await calcSharePrice(web3, NOINDEX, oneShareAmount, mmAddress)
    .then((res) => {
      resultObj.push({
        noPrice: res,
      })
    })
    .catch((err) => {
      console.error(err)
    })

  return resultObj
}

export const calcBuyAmount = async (
  input: string,
  outcomeIndex: string,
  mmAddress: string
) => {
  const mmContract = await getMarketMakerContract(mmAddress)
  const currentAccount = await getAccount()
  const returnAmount = await mmContract.methods
    .calcBuyAmount(web3.utils.toWei(input), outcomeIndex)
    .call({ from: currentAccount })
  return returnAmount
}

export const redeemPositions = async (conditionId: any, indexSets = [1, 2]) => {
  const collateralAddress = COLLATERALTOKENCONTRACT
  const parentCollectionId = BYTES32ZERO
  const ctcontract = getConditionalTokenContract()
  const currentAccount = await getAccount()
  return ctcontract.methods
    .redeemPositions(
      collateralAddress,
      parentCollectionId,
      conditionId,
      indexSets
    )
    .estimateGas({ from: currentAccount })
    .then((gasEstimate: number) => {
      return ctcontract.methods
        .redeemPositions(
          collateralAddress,
          parentCollectionId,
          conditionId,
          indexSets
        )
        .send({ from: currentAccount, gas: gasEstimate })
    })
}
