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
          <BoldStyled fontSize="18px" color="#D85439">
            {formatNumber(data.accountLiquidity)} UNT
          </BoldStyled>
        </FlexText>
        <FlexText>
          <H4_NoScale fontSize="18px">Pool Share</H4_NoScale>
          <BoldStyled fontSize="18px" color="#D85439">
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
      <SubmitContainer>
        <Button onClick={() => handleAddLiquidity()} disabled={disabled}>
          Add liquidity
        </Button>
      </SubmitContainer>

      <TextContainer>
        <FlexText style={{ textAlign: 'center', marginTop: '20px' }}>
          <H4_NoScale fontSize="18px">Pending Fees Rewards</H4_NoScale>
          <BoldStyled fontSize="18px" color="#D85439">
            {pendingFees} UNT
          </BoldStyled>
        </FlexText>
      </TextContainer>
      <SubmitContainer>
        <Button onClick={() => handleWidthDrawFees()}>Claim Rewards</Button>
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

const InputStyled = styled(Input)`
  margin-top: 15px;
  width: 100%;
`
const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
