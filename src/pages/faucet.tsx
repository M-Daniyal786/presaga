import styled from 'styled-components'
import { Button } from '../components/shared/Buttons'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer'
import { BodyContainer } from '../components/shared/Containers'
import { Input } from '../components/shared/Inputs'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { askFaucet } from '../services/trade'
import { useEffect, useState } from 'react'
import { getAccount } from '../services/account'

let web3: any
if (typeof window !== 'undefined' && window.ethereum) {
  // eslint-disable-next-line global-require

  const Web3 = require('web3')
  web3 = new Web3(window.ethereum)
} else {
  const Web3 = require('web3')
  web3 = new Web3(
    new Web3.providers.HttpProvider('https://rinkeby.arbitrum.io/rpc')
  )
}
const Faucet = () => {
  const [account, setAccount] = useState()

  useEffect(() => {
    async function loadAccount() {
      const user = await getAccount()
      setAccount(user)
    }
    loadAccount()
  }, [account])
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

  const sendFunds = async () => {
    if (account != undefined) {
      await askFaucet()
        .then((receipt) => {
          alert(' 1000 UNT was sent to your wallet')
        })

        .catch((error) => {
          alert('Come back tomorrow ^^')
        })
    } else {
      alert('Please connect your wallet and try again')
    }
  }
  return (
    <Container>
      <Navbar />
      <ToastContainer />
      {/* <Body> */}
        <FaucetContainer>

          <Text>1- Press “ASK FAUCET”</Text>
          <Text>2- Wait for the confirmation message</Text>
          <Text>Token address:</Text>

          <Para>
            0x8adfB2924092E6d99572C4092136fe7B66b7ABfD
          </Para>

          <FundMeRow>
            <Button onClick={() => sendFunds()}>Get Test UNT </Button>
          </FundMeRow>
          <Para>
            This faucet drips 1000 UNT every 24 hours
          </Para>
        </FaucetContainer>
      {/* </Body> */}
      <Footer />
    </Container>
  )
}

export default Faucet

const FaucetContainer = styled.div`
  display:flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content:stretch;
  flex-direction: column;
  height:70vh;
  /* margin-left: 50px; */
  width:100%;
`

const Para = styled.div`
  color: white;
  padding-top: 10px;
  @media (max-width: 440px) {
  font-size: 3.5vw;
  }
  `

const Container = styled.div`
  
  background-image: url("dark-background-lunar.jpeg");
  background-position: center center;
  background-size: cover;
  height:100%;
`

const Body = styled.div`
  
`

const Text = styled.div`
  padding-top: 50px;
  color: #ffffff;
  font-size: 35px;
  
  @media (max-width: 768px) {
    font-size: 27px;
  }
  @media (max-width: 440px) {
  font-size: 5vw;
  }
`

const ResultText = styled.div`
  color: #ffffff;
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 19px;
  }
`

const FundMeRow = styled.div`
  display: flex;
  padding-top: 50px;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 10px;
  align-items: center;
`
