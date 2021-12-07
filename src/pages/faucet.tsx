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
    <>
      <Navbar />
      <ToastContainer />
      <BodyContainer>
        <FaucetContainer>
          <Text>1- Press “ASK FAUCET”</Text>
          <Text>2 - Wait for the confirmation message</Text>
          <Text>Token address:</Text>

          <p style={{ color: 'white', overflow: 'auto' }}>
            0x8adfB2924092E6d99572C4092136fe7B66b7ABfD
          </p>
          <FundMeRow>
            <Button onClick={() => sendFunds()}>Get Test UNT </Button>
          </FundMeRow>
          <p style={{ color: 'white', padding: '10px' }}>
            This faucet drips 1000 UNT every 24 hours
          </p>
        </FaucetContainer>
      </BodyContainer>
      <Footer />
    </>
  )
}

export default Faucet

const FaucetContainer = styled.div`
  padding-top: 104px;
`

const Text = styled.div`
  padding-top: 50px;
  color: #ffffff;
  font-size: 35px;
  @media (max-width: 768px) {
    font-size: 27px;
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
