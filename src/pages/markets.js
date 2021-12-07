import React, { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import Navbar from '../components/navbar/Navbar'
import WaysToEarn from '../components/WaysToEarn'
import KeyAspects from '../components/KeyAspects'
import AktiveMarkets from '../components/ActiveMarkets'
import MyMarkets from '../components/MyMarkets'
import ResolvedAndClosedMarkets from '../components/ResolvedAndClosedMarkets'
import Footer from '../components/FooterFixed'
import styled from 'styled-components'
import { H2, H4Bold } from '../components/shared/Text'
import { BodyContainer } from '../components/shared/Containers'
import {
  getActiveMarkets,
  getAllMarkets,
  getAllMarketsAddresses,
} from '../services/markets'
import { getCollectionIds } from '../services/conditionalTokens'
import Web3 from 'web3'

import { ToggleButton } from '../components/shared/Buttons'
import { RPC_URL, supportedNetworkId } from '../config/network'

const Markets = () => {
  const [markets, setMarkets] = useState([])
  const [userMarkets, setUserMarkets] = useState([])
  const [activeToggle, setActiveToggle] = useState('all')
  const [account, setAccount] = useState()
  const [id, setId] = useState()
  useEffect(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)

      await window.web3.eth.net.getId().then((res) => {
        setId(res.toString())
      })
    }
    const user = localStorage.getItem('user')
    setAccount(user)
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
    await setAllMarkets(web3)
  }, [])

  const setAllMarkets = async (web3) => {
    const market = await getAllMarkets(web3)
    const userM = market.filter(
      (i) => i?.userShares[0] !== '0' || i?.userShares[1] !== '0'
    )
    setMarkets(market)
    setUserMarkets(userM)
  }

  const returnMarkets = () => {
    switch (activeToggle) {
      case 'all':
        return <AktiveMarkets data={markets} />

      case 'myMarkets':
        return (
          <div style={{ padding: '10px' }}>
            <MyMarkets data={userMarkets} />
          </div>
        )

      case 'closed':
        return <ResolvedAndClosedMarkets data={[]} />
    }
  }

  return (
    <div style={{ backgroundImage: `url("dark-background-lunar.jpeg")`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat' , height:"100vh"}}>
      {/* <Image src={BackLunarBg} alt="Picture of the author" /> */}
      <Navbar />
      <BodyContainer>
        <ButtonRow id="markets">
          <TogButton
            style={{
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
              textAlign: 'center',
              backgroundColor: activeToggle == 'all' ? '#343a40' : '',
            }}
            onClick={() => setActiveToggle('all')}
          >
            All Markets
          </TogButton>
          <TogButton
            style={{
              textAlign: 'center',
              padding: '10px',
              width: '160px',
              backgroundColor: activeToggle == 'myMarkets' ? '#343a40' : '',
            }}
            onClick={() => setActiveToggle('myMarkets')}
          >
            My Markets
          </TogButton>
          <TogButton
            style={{
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              textAlign: 'center',
              backgroundColor: activeToggle == 'closed' ? '#343a40' : '',
            }}
            onClick={() => setActiveToggle('closed')}
          >
            Resolved Markets
          </TogButton>
        </ButtonRow>
        {id === supportedNetworkId ? (
          returnMarkets()
        ) : (
          <div style={{ color: 'white' }}>
            Please make sure you are connected to the arbitrum testnet
          </div>
        )}
      </BodyContainer>
      

      
      <Footer />
        
        
    </div>
  )
}

export default Markets
const ButtonRow = styled.div`
  display: flex;
  padding-top: 25px;
  justify-content: center;
`
export const TogButton = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: antiquewhite;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 20px;
  justify-content: center;

  background: #d85439;
  //box-shadow: 0px 2px 20px rgba(216, 84, 57, 0.7);
  //border-radius: 25px;
  //border-color: #d85439;
  //border-width: 1px;
  //border-style: solid;
  //font-family: Nunito;
  //font-weight: bold;
  font-size: 18px;
`
