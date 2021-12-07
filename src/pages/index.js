import React, { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import Navbar from '../components/navbar/Navbar'
import WaysToEarn from '../components/WaysToEarn'
import KeyAspects from '../components/KeyAspects'
import AktiveMarkets from '../components/ActiveMarkets'
import MyMarkets from '../components/MyMarkets'
import ResolvedAndClosedMarkets from '../components/ResolvedAndClosedMarkets'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { H2, H4Bold } from '../components/shared/Text'
import { BodyContainer } from '../components/shared/Containers'

import {
  getActiveMarkets,
  getAllMarkets,
  getAllMarketsAddresses,
} from '../services/markets'
import Web3 from 'web3'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RPC_URL } from '../config/network'
import { ToastContainer, toast } from 'react-toastify'

const Home = () => {
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
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
    await setAllMarkets(web3)
  }, [])

  const setAllMarkets = async (web3) => {
    const market = await getAllMarkets(web3)
    const temp = market.filter(
      (i) => i?.userShares[0] !== '0' || i?.userShares[1] !== '0'
    )
    setMarkets(market)
    setUserMarkets(temp)
    const user = localStorage.getItem('user')
    setAccount(user)
  }

  return (
    <>
      <CallToAction />

      <BodyContainer>
        <WaysToEarn />
        <KeyAspects />
      </BodyContainer>

      <Footer/>
    </>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
/* export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    'https://presaga-beta.unitynetwork.app/api/v1/markets'
  )
  const resJson = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      markets: resJson.data,
    },
  }
} */

export default Home
const ButtonRow = styled.div`
  display: flex;
  padding-top: 100px;
  justify-content: center;

  @media (max-width: 568px) {
    padding-top: 25px;
  }
`
