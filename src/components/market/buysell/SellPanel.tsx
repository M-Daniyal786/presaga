import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Input } from '../../shared/Inputs'
import { H4_NoScale } from '../../shared/Text'
import {
  getAccount,
  getAccountBalanceUNT,
  loadAccount,
} from '../../../services/account'
import { RPC_URL, networkExplorer } from '../../../config/network'
import { Button } from '../../shared/Buttons'
import { Sell, calcSellCollateral } from '../../../services/trade'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { formatBigNumber } from '../../../utils/numbers'

import Image from 'next/image'
import dollar from '../../../../public/dollar.png'


let web3: any
const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

const SellPanel = (props: any) => {
  const [howMuch, setHowMuch] = useState('How much?')
  const [userBalance, setUserBalance] = useState('')
  const [amount, setAmount] = useState('')
  const [estimatedShares, setEstimatedShares] = useState(0)
  const share = props.selectedShare
  const [account, setAccount] = useState()
  const [untValue, setUntValue] = useState()
  const [sellAmount, setSellAmount] = useState()
  const [lpFeeAmount, setLpFeeAmount] = useState()
  const data = props.data
  useEffect(async () => {
    //const user = localStorage.getItem('user')
    const user = await getAccount()
    setAccount(user)
  }, [userBalance])

  useEffect(async () => {
    //const user = localStorage.getItem('user')
    setUntValue(0)
    setSellAmount(0)
  }, [props.selectedShare])

  const transactionSuccessStatus = (hash) => (
    <div>
      Success!{' '}
      <a target="_blank" href={networkExplorer + hash}>
        View Transaction Here
      </a>
    </div>
  )

  const transactionFailureStatus = (hash) => (
    <div>
      Transaction failed!{' '}
      <a target="_blank" href={networkExplorer + hash}>
        View Transaction Here
      </a>
    </div>
  )
  const handleSell = async () => {
    if (!account) {
      toast.error('Please connect your wallet to proceed')

      return
    }
    const convertedValue = await calcSellCollateral(
      sellAmount,
      share == 'No' ? '0' : '1',
      data?.address,
      data?.yesPositionId,
      data?.noPositionId
    )

    Sell(share == 'No' ? '0' : '1', convertedValue.toString(), data.address)
      .then((receipt) => {
        if (receipt.status === true) {
          toast.success(transactionSuccessStatus(receipt.transactionHash))
        } else {
          toast.error(transactionFailureStatus(receipt.transactionHash))
        }
      })

      .catch((error) => {
        toast.error(error.message)
      })
  }

  const changeValue = async (value: number) => {
    let defVal = value
    if (share === 'Yes') {
      if (defVal < data?.userShares[1]) defVal = value
      else defVal = 0
    }
    if (share === 'No') {
      if (defVal < data?.userShares[0]) defVal = value
      else defVal = 0
    }
    const convertedValue = await calcSellCollateral(
      value,
      share == 'No' ? '0' : '1',
      data?.address,
      data?.yesPositionId,
      data?.noPositionId
    )
    setSellAmount(defVal)
    setLpFeeAmount(((value * data.fee) / 100).toFixed(6))
    setUntValue((+convertedValue).toFixed(2))
  }
  const formatNumber = (val: number) => {
    return parseFloat(val).toFixed(2)
  }

  const setMaxSellValue = async () => {
    let defVal = 0

    if (share == 'No') {
      defVal = data?.userShares[0]
      setSellAmount(formatBigNumber(data?.userShares[0]))
      // alert(val);
    }
    if (share === 'Yes') {
      defVal = data?.userShares[1]
      setSellAmount(formatBigNumber(data?.userShares[1]))
    }
    const convertedValue = await calcSellCollateral(
      formatBigNumber(defVal),
      share == 'No' ? '0' : '1',
      data?.address,
      data?.yesPositionId,
      data?.noPositionId
    )
    setLpFeeAmount(((formatBigNumber(defVal) * data.fee) / 100).toFixed(6))
    setUntValue((+convertedValue).toFixed(2))
  }

  return (
    <SellPanelContainer>
      <HowMuchContainer>
        <H4_NoScale fontSize="18px">How many?</H4_NoScale>
        <MaxText
          fontSize="18px"
          color="#D85439"
          onClick={() => setMaxSellValue()}
        >
          Max
        </MaxText>
      </HowMuchContainer>
      <InputStyled
        placeholder="UNT"
        type="number"
        value={sellAmount}
        onChange={(e) => changeValue(e.target.value)}
      />
      <EstimatedShares>
        <LeftText fontSize="16px">Estimated price</LeftText>
        <RightText fontSize="14px" color="#999999">
          {untValue} UNT
        </RightText>
        <LeftText fontSize="14px" color="#999999">
          {data.fee}% LP fee applies
        </LeftText>
        <RightText fontSize="14px" color="#999999">
          {lpFeeAmount} UNT
        </RightText>
      </EstimatedShares>
      <SubmitContainer>
        {/* <Button
          onClick={() => {
            handleSell()
          }}
        >
          Sell
        </Button> */}

<div id="btnSetUnitDiv2">
            {/* <Image id="imgSetUnit2" src={dollar} alt="" /> */}
            <button id="btnBuyUnit2" onClick={() => {
            handleSell()
          }}>Sell</button>
          </div>

      </SubmitContainer>
    </SellPanelContainer>
  )
}

export default SellPanel

const SellPanelContainer = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding-top: 42px;
  }
`

const HowMuchContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const EstimatedShares = styled.div`
  padding-top: 25px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    row-gap: 5px;
  }
`

const MaxText = styled(H4_NoScale)`
  text-decoration-line: underline;
  cursor: pointer;
`

const LeftText = styled(H4_NoScale)`
  flex: 50%;
  @media (max-width: 768px) {
    flex: 100%;
  }
`

const RightText = styled(H4_NoScale)`
  flex: 50%;
  justify-content: end;
  display: flex;
  @media (max-width: 768px) {
    flex: 100%;
    justify-content: start;
  }
`

const UNTInput = styled.input`
  background: rgba(255,255,255,.3);
  border: 0px solid #d85439;
  //box-sizing: border-box;
  border-radius: 20px;
  font-size: 18px;
padding:10px;
  //min-width: 442px;
  color: #ffffff;
  //height: 55px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /*
    padding-left: 10px;
    margin-right: 67px;
    display: block;
    font-family: Nunito;
    margin-bottom: 8px;
    padding: 8px 20px;
    width: 100%;
    */
`


const InputStyled = styled(UNTInput)`
::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    } 
  margin-top: 15px;
  
`
const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
