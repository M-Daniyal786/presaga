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
  const [question, setQuestion] = useState('')
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [resolutionSource, setResolutionSource] = useState("")
  const [oracleAddress, setOracleAddress] = useState("")
  const [initialLiquidity, setInitialLiquidity] = useState("")
  const [liquidityFee, setLiquidityFee] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {}, [])

  const handleResolve = async () => {
    setMarketStateToResolved(marketAddress)
  }

  return (
    <BuyPanelContainer>
      <InputStyledBorder
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
      
      <StyledHeading>New Market</StyledHeading>

      <StyledLabel>Question</StyledLabel>
      <InputStyled
        placeholder="Question"
        type="text"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
      />
       <StyledLabel>Title</StyledLabel>
       <InputStyled
        placeholder="Title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
       <StyledLabel>Description</StyledLabel>
       <StyledTextArea
        placeholder="Description"
        // type="text"
        
        // style={{ marginTop: "15px",
        //   marginBottom:"10px",
        //   width:"50%",
        //   height:"50px",
        //   color:"white",
        //   padding: "10px",
        //   backgroundColor: "#1A1C1F",
        //   borderColor: "#D85439",
        //   borderRadius: 5
        // }}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
       <StyledLabel>Resolution Source</StyledLabel>
       <InputStyled
        placeholder="Resolution Source"
        type="text"
        onChange={(e) => setResolutionSource(e.target.value)}
        value={resolutionSource}
      />
       <StyledLabel>Oracle Address</StyledLabel>
       <InputStyled
        placeholder="Oracle Address"
        type="text"
        onChange={(e) => setOracleAddress(e.target.value)}
        value={oracleAddress}
      />
 <StyledLabel>Initial Liquidity</StyledLabel>
<InputStyled
        placeholder="Initial Liquidity"
        type="number"
        onChange={(e) => setInitialLiquidity(e.target.value)}
        value={initialLiquidity}
      />
 <StyledLabel>Liquidity Provider Fee</StyledLabel>
<InputStyled
        placeholder="Liquidity Provider Fee"
        type="number"
        onChange={(e) => setLiquidityFee(e.target.value)}
        value={liquidityFee}
      />
       <StyledLabel>End Date</StyledLabel>
      <InputStyledBorder
        placeholder="End Date"
        type="datetime-local"
        onChange={(e) => setEndDate(e.target.value)}
        value={endDate}
      />

    <Button
        onClick={async () => {
         console.log("create market button")
        }}

      >
        Create Market
      </Button>

    </BuyPanelContainer>
  )
}

export default AdminPage

const BuyPanelContainer = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-bottom:10px;
  width:50%;
  height:50px;
  color:white;
  padding:10px;
  
`
const StyledTextArea = styled.textarea`
margin-top: 15px;
  margin-bottom:10px;
  width:50%;
  min-height:80px;
  color:white;
  padding:10px;
          background-color: #1A1C1F;
          border-color: #D85439;
          border-radius: 5px;
          @media (max-width: 768px) {
    width:100%
  }
  
`

const StyledLabel = styled.h5`
  display: flex;
  text-align: center;
  color:white;
  margin-top:10px;
`

const StyledHeading = styled.h2`
  display: flex;
  text-align: center;
  color:white;
  margin-top:10px;
`

// const InputStyledLarge = styled(Input)`
//   margin-top: 15px;
//   margin-bottom:10px;
//   width:50%;
//   height:100px;
//   color:white;
//   padding:10px;
  
// `

const InputStyledBorder = styled(Input)`
  margin-top: 15px;
  margin-bottom:30px;
  width:50%;
  height:50px;
  color:white;
  padding:10px;
  
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
