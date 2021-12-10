import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input } from '../../shared/Inputs'
import { H4Bold_NoScale, H4_NoScale } from '../../shared/Text'
import { addFunding } from '../../../services/liquidity'
import { Button } from '../../shared/Buttons'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { getAccount, getAccountBalanceUNT } from '../../../services/account'
import { RPC_URL, networkExplorer } from '../../../config/network'
import { widthDrawFees, getWithdrawableFees } from '../../../services/trade'

import Image from 'next/image'

import Ribbon from "../../../../public/ribbon.png"

const formatNumber = (val: number) => {
  return parseFloat(val).toFixed(2)
}
let web3: any
if (typeof window !== 'undefined' && window.ethereum) {
  // eslint-disable-next-line global-require

  const Web3 = require('web3')
  web3 = new Web3(window.ethereum)
} else {
  const Web3 = require('web3')
  web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
}
const AddPanel = (props) => {
  const data = props.data
  const [amount, setAmount] = useState()

  const [userBalance, setUserBalance] = useState('')

  const [account, setAccount] = useState()
  const [inputMessage, setInputMessage] = useState('How much?')
  const [disabled, setDisabled] = useState(false)

  const [pendingFees, setPendingFees] = useState(0)

  async function getPendingFees() {
    const user = await getAccount()
    const rewards = await getWithdrawableFees(data.address)
    setPendingFees(rewards)
  }
  async function loadUserData() {
    const user = await getAccount()
    setAccount(user)
    if (user) {
      const userUNTbALANCE = await getAccountBalanceUNT(user)
      setUserBalance(userUNTbALANCE)
    }
  }
  useEffect(() => {
    getPendingFees()
    loadUserData()

    const intervalId = setInterval(async () => {
      const user = await getAccount()
      setAccount(user)
      if (user) {
        const userUNTbALANCE = await getAccountBalanceUNT(user)
        setUserBalance(userUNTbALANCE)
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [userBalance])

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

  const handleChange = (value: number) => {
    if (
      parseFloat(value.toString()) > parseFloat(web3.utils.fromWei(userBalance))
    ) {
      setInputMessage('not enough balance')
      setDisabled(true)
    } else {
      setAmount(value)
      setInputMessage('How much?')
    }
  }

  const handleAddLiquidity = () => {
    addFunding(amount, data.address)
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
  const handleWidthDrawFees = () => {
    widthDrawFees(data.address)
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
  return (
    <AddPanelContainer>
      <TextContainer>
        <FlexText>
          <H4_NoScale fontSize="18px">Added liquidity</H4_NoScale>
          <BoldStyled fontSize="18px" color="#FFFFFF">
            {formatNumber(data.accountLiquidity)} UNT
          </BoldStyled>
        </FlexText>
        <FlexText>
          <H4_NoScale fontSize="18px">Pool Share</H4_NoScale>
          <BoldStyled fontSize="18px" color="#FFFFFF">
            {Math.round(
              (parseInt(data.accountLiquidity) * 100) / data.liquidity
            )}
            %
          </BoldStyled>
        </FlexText>
      </TextContainer>
      <HowMuchStyled fontSize="18px">{inputMessage}</HowMuchStyled>
      <InputStyled
        placeholder="UNT"
        type="number"
        onChange={(e) => handleChange(e.target.value)}
      />
      <SubmitContainerNew>
        <Button onClick={() => handleAddLiquidity()} disabled={disabled}>
          Add liquidity
        </Button>

        <FlexText style={{ textAlign: 'end', marginTop: '10px' }}>
          <H4_NoScale fontSize="18px">Pending Fees Rewards</H4_NoScale>
          <BoldStyled fontSize="18px" color="#D85439">
            {pendingFees} UNT
          </BoldStyled>
        </FlexText>
      </SubmitContainerNew>

      {/* <TextContainer>
        <FlexText style={{ textAlign: 'center', marginTop: '20px' }}>
          <H4_NoScale fontSize="18px">Pending Fees Rewards</H4_NoScale>
          <BoldStyled fontSize="18px" color="#D85439">
            {pendingFees} UNT
          </BoldStyled>
        </FlexText>
      </TextContainer> */}
      <SubmitContainer>
        {/* <Button onClick={() => handleWidthDrawFees()}>Claim Rewards</Button> */}
        <div id="btnSetUnitDiv2">
            <Image id="imgSetUnit2" src={Ribbon} alt="" />
            <button id="btnBuyUnit2" onClick={() => {
           handleWidthDrawFees()
          }}>Claim Rewards</button>
          </div>
      </SubmitContainer>
    </AddPanelContainer>
  )
}

export default AddPanel

const AddPanelContainer = styled.div``
const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    row-gap: 25px;
  }
`

const FlexText = styled.div`
  flex: 50%;
  @media (max-width: 768px) {
    flex: 100%;
  }
`

const HowMuchStyled = styled(H4_NoScale)`
  padding-top: 45px;
`

const BoldStyled = styled(H4Bold_NoScale)`
  padding-top: 6px;
`

const UNTInput = styled.input`
  background: rgba(255,255,255,.3);
  border: 0px solid #d85439;
  //box-sizing: border-box;
  border-radius: 50px;
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
  margin-top: 15px;
  width:100% ;
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

`
const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`

const SubmitContainerNew = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`


