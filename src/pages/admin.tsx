import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Input } from '../components/shared/Inputs'
import { H4_NoScale } from '../components/shared/Text'

import { RPC_URL } from '../config/network'
import { Button } from '../components/shared/Buttons'

import 'react-toastify/dist/ReactToastify.css'

import { setMarketStateToResolved } from '../services/admin'

let web3: any
if (typeof window !== 'undefined' && window.ethereum) {
  // eslint-disable-next-line global-require

  const Web3 = require('web3')
  web3 = new Web3(window.ethereum)
} else {
  const Web3 = require('web3')
  web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
}
const AdminPage = () => {
  const [marketAddress, setMarketAddress] = useState('')
  useEffect(() => {}, [])

  const handleResolve = async () => {
    setMarketStateToResolved(marketAddress)
  }

  return (
    <BuyPanelContainer>
      <InputStyled
        placeholder="market address"
        type="text"
        onChange={(e) => setMarketAddress(e.target.value)}
        value={marketAddress}
      />

      <Button
        onClick={async () => {
          await handleResolve()
        }}
      >
        Resolve market
      </Button>
    </BuyPanelContainer>
  )
}

export default AdminPage

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
