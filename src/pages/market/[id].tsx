import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer'
import { BodyContainer } from '../../components/shared/Containers'
import styled from 'styled-components'
import { H2_NoScale, H3_NoScale } from '../../components/shared/Text'
import Elipse from '../../components/shared/Elipse'
import InfoPanel1 from '../../components/market/InfoPanel1'
import InfoPanel2 from '../../components/market/InfoPanel2'
import InfoPanelShares from '../../components/market/InfoPanelShares'
import BuySellPanel from '../../components/market/buysell/BuySellPanel'
import ClosedPanel from '../../components/market/buysell/ClosedPanel'
import NoLiquidityPanel from '../../components/market/buysell/NoLiquidityPanel'
import LiquidityPanel from '../../components/market/liquidity/LiquidityPanel'
import { getSingleMarket } from '../../services/markets'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import Web3 from 'web3'
import { getAccount, loadAccount } from '../../services/account'
import { RiShareBoxFill } from 'react-icons/ri'
import { RPC_URL } from '../../config/network'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ToastContainer, toast } from 'react-toastify'
import FooterFixed from '../../components/Footer'
const marketStates = {
  NO_LIQUIDITY: 0,
  CLOSED: 'true',
  OPEN: 'false',
}

const Market = (props) => {
  const [market, setMarketState] = useState([])
  const [account, setAccount] = useState()
  const router = useRouter()
  const [add, setAdd] = useState()
  const { id } = router.query

  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const refreshData = () => {
    router.replace(router.asPath)
    setIsRefreshing(true)
  }

  useEffect(() => {
    setIsRefreshing(false)
  }, [props])

  useEffect(() => {
    async function loadMarket(id: number) {
      const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

      try {
        await getMarket(web3, id)
      } catch (error) {
        setIsRefreshing(true)
      }

      const user = localStorage.getItem('user')
      setAccount(user)
    }
    if (id) {
      loadMarket(id)
    }
  }, [account, market, id])

  const getMarket = async (web3, address) => {
    const market = await getSingleMarket(web3, address)

    setMarketState(market)
  }

  return (
    <div >
      <ToastContainer />
      <Navbar folder={"market"}/>
      {/*   {isRefreshing && (
        <h2 style={{ color: 'white' }}>
          Oops, seems that something went wrong while fetching your market,
          check that you have inserted correct address and try again
        </h2>
      )} */}
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
      {market.length > 0 ? (
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center", maxWidth:"80%"}}>
          <BodyContainer>
            <Row>
              <FlexContainer>
                <FlexItem flex="100%">
                  <div class="three">
                    <h1>Market </h1>
                  </div>
                  <H3_NoScale fontSize="25px">
                    {market[0]?.question}{' '}
                  </H3_NoScale>
                  <br />
                  <InfoPanel1 data={market[0]} />
               
                {/* <FlexItem flex="40%"> */}
           
                  <InfoPanelSharesContainer>
                    {market[0].userShares && (
                      <>
                        <InfoPanelShares
                          shares={market[0]?.userShares[0]}
                          priceShare={market[0]?.noPrice}
                          type="NO"
                        />

                        <InfoPanelShares
                          shares={market[0]?.userShares[1]}
                          priceShare={market[0]?.yesPrice}
                          type="YES"
                        />
                      </>
                    )}
                  </InfoPanelSharesContainer>
                {/* </FlexItem> */}
                </FlexItem>
              </FlexContainer>

              <Row>
                <MarketsText>
                  <p>
                    Every market has its own resolution source. Should an issue
                    arise with the outcome settlement for a given market, it
                    will be analysed and settled by a committee of
                    specifically-appointed members from the Unity Network
                    Foundation.
                  </p>
                  <p>
                    Resolution source : <RiShareBoxFill />
                  </p>
                </MarketsText>
              </Row>
            </Row>
          </BodyContainer>

          <div class="container navigation mt-2">
            <div class="sharesLiquidityToggle row"></div>
            <div class="row">
              <div class="row sharesLiquidityToggleLG">
                <ul class="nav nav-tabs markets">
                  <li class="col-6 nav-item shadow">
                    <a
                      class="nav-link active"
                      data-bs-toggle="tab"
                      href="#shares"
                    >
                      <div class="four">
                        <h1>Trade </h1>
                      </div>
                    </a>
                  </li>
                  <li class=" col-6 nav-item shadow">
                    <a class="nav-link" data-bs-toggle="tab" href="#liquidity">
                      <div class="four">
                        <h1>Liquidity </h1>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tab-content">
              <div class="tab-pane active" id="shares">
                <BuySell>
                  {!market[0].closed && <BuySellPanel data={market[0]} />}
                  {market[0].closed == true && market[0].resolved == false ? (
                    <H3_NoScale style={{ padding: '50px' }}>
                      Trading was temporarily suspended...
                    </H3_NoScale>
                  ) : (
                    <></>
                  )}
                  {market[0].resolved == true && market[0].closed == true ? (
                    <ClosedPanel data={market[0]} />
                  ) : (
                    <></>
                  )}
                  {market[0].liquidity == marketStates.NO_LIQUIDITY && (
                    <NoLiquidityPanel />
                  )}
                </BuySell>
              </div>
              <div class="tab-pane" id="liquidity">
                <AddLiquidity>
                  <LiquidityPanel data={market[0]} />
                </AddLiquidity>
              </div>
            </div>
          </div>

        </div>
      ) : (
        !isRefreshing && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '200px',
              }}
            >
              <Loader
                type="Puff"
                color="#d85439"
                height={300}
                width={300}
                timeout={4000}
              />
              <h4 style={{ color: '#d85439' }}>Fetching market data...</h4>
            </div>
          </div>
        )
        )}
      </div>
      <FooterFixed />
    </div>
  )
}

export default Market

/* export const getStaticPaths = () => ({
  paths: ['/market/[id]'],
  fallback: true,
}) */

/* export const getStaticPaths: GetStaticPaths = async () => {
  const ids = ['0xb59ce073669f1948bc8d98d3b6f1f8178b904f71'] // Example
  const paths = ids.map((id) => ({
    params: { id },
    //paths: "/market/[id]"
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: {} }
} */

const MarketsText = styled.div`
  color: antiquewhite;
  border-left: 3px solid #d85439;
  padding-left: 15px;
`
const BuySell = styled.div`
  display: flex;
  justify-content: center;
`

const AddLiquidity = styled.div`
  display: flex;
  justify-content: center;
`

const FlexRow = styled.div`
  display: flex;
  column-gap: 25px;
  align-items: center;
  padding-bottom: 25px;
`

const Row = styled.div`
  padding-top: 54px;
  @media (max-width: 768px) {
    padding-top: 25px;
  }
`

const MobileHidden = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 25px;
  row-gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 25px;
  }
`

const InfoPanelSharesContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  row-gap: 20px;
`

const FlexItem = styled.div`
  flex: ${(props) => props.flex || '50%'};
  column-gap: 20px;
  @media (max-width: 768px) {
    flex: 100%;
  }
`

const FlexWrappedItem = styled.div`
  flex: ${(props) => props.flex || '50%'};
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex: 100%;
  }
`
