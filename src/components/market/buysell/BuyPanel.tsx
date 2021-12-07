import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getAccount,
  getAccountBalanceUNT,
  loadAccount,
} from '../../../services/account'
import { Input } from '../../shared/Inputs'
import { H4_NoScale } from '../../shared/Text'

import { calcBuyAmount } from '../../../services/markets'
import { RPC_URL, networkExplorer } from '../../../config/network'
import { Button } from '../../shared/Buttons'
import { Buy } from '../../../services/trade'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

let web3: any
if (typeof window !== 'undefined' && window.ethereum) {
  // eslint-disable-next-line global-require

  const Web3 = require('web3')
  web3 = new Web3(window.ethereum)
} else {
  const Web3 = require('web3')
  web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
}
const BuyPanel = (props: any) => {
  const [howMuch, setHowMuch] = useState('How much?')
  const [userBalance, setUserBalance] = useState('')
  const [amount, setAmount] = useState('')
  const [estimatedShares, setEstimatedShares] = useState(0)
  const share = props.selectedShare
  const [account, setAccount] = useState()
  const [lpFeeAmount, setLpFeeAmount] = useState()
  useEffect(async () => {
    //const user = localStorage.getItem('user')
    const user = await getAccount()
    setAccount(user)
    if (user) {
      const userUNTbALANCE = await getAccountBalanceUNT(user)
      setUserBalance(userUNTbALANCE)
    }
  }, [userBalance, props.selectedShare])

  useEffect(async () => {
    setEstimatedShares(0)
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
  const handleBuy = async () => {
    if (amount == '') {
      toast.error('Please insert a valid amount')

      return
    }
    if (!account) {
      toast.error('Please connect your wallet to proceed')

      return
    }
    Buy(share == 'No' ? '0' : '1', amount.toString(), data.address)
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
  const data = props.data

  const changeValue = async (value: number) => {
    if (
      parseFloat(value.toString()) > parseFloat(web3.utils.fromWei(userBalance))
    ) {
      setHowMuch('Not enough balance')
      setEstimatedShares(0)
    } else {
      setHowMuch('How much?')
      if (value) {
        await calcBuyAmount(
          value.toString(),
          share == 'No' ? '0' : '1',
          data.address
        ).then((res) => {
          const value = web3.utils.fromWei(res)
          setEstimatedShares(value)
        })
      }
    }
    setLpFeeAmount(((value * data.fee) / 100).toFixed(6))
    setAmount(value.toString())
  }
  const formatNumber = (val: number) => {
    return parseFloat(val).toFixed(2)
  }

  return (
    <BuyPanelContainer>
      <H4_NoScale fontSize="18px">
        <span
          style={{
            color: howMuch == 'Not enough balance' ? '#d85439' : 'antiquewhite',
          }}
        >
          {howMuch}
        </span>
      </H4_NoScale>
      <InputStyled
        placeholder="UNT"
        type="number"
        onChange={(e) => changeValue(e.target.value)}
        value={amount}
      />
      <EstimatedShares>
        <LeftText fontSize="16px">Estimated shares</LeftText>
        <RightText fontSize="14px" color="#999999">
          {formatNumber(estimatedShares)} {props.selectedShare}
        </RightText>
        <LeftText fontSize="14px" color="#999999">
          {data.fee}% LP fee applies
        </LeftText>
        <RightText fontSize="14px" color="#999999">
          {lpFeeAmount}UNT
        </RightText>
      </EstimatedShares>
      <SubmitContainer>
        <Button
          onClick={async () => {
            await handleBuy()
          }}
          //disabled={amount ? false : true}
        >
          Buy
        </Button>
      </SubmitContainer>
    </BuyPanelContainer>
  )
}

export default BuyPanel

const BuyPanelContainer = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding-top: 42px;
  }
`
const EstimatedShares = styled.div`
  padding-top: 25px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    row-gap: 5px;
  }
`

const LeftText = styled(H4_NoScale)`
  flex: 80%;
  @media (max-width: 768px) {
    flex: 100%;
  }
`
const RightText = styled(H4_NoScale)`
  flex: 20%;
  justify-content: end;
  display: flex;
  @media (max-width: 768px) {
    flex: 100%;
    justify-content: start;
  }
`

const InputStyled = styled(Input)`
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
