import React, { useEffect, useRef, useState } from 'react'

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
import { minWidth } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const marketStates = {
  NO_LIQUIDITY: 0,
  CLOSED: 'true',
  OPEN: 'false',
}

const market_id_styles = {
  imageContainer: { 
    backgroundImage: `url("/dark-background-lunar.jpeg")`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', height: "100%"
  },
}

const marketStyles = {
  imageContainer: {
    backgroundImage: `url("dark-background-lunar.jpeg")`, backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', height: "100vh"
  },
  buttonRowContainer: {
    justifyContent: "flex-end",
    
  },

  tabButtonContainer: { },
  
  tabButton1: {
  borderTopLeftRadius: '30px',
  borderBottomLeftRadius: '30px',
  borderTopRightRadius: '30px',
  borderBottomRightRadius: '30px',
    textAlign: 'center',
    width:"50%"
  
  },
  tabButton2:{
    textAlign: 'center',
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',marginLeft:"20px",
    padding: '7px',
    width:"50%"

    
  
  },

  

}

const Market = (props) => {
  const myRef = useRef(null)
   
  const [market, setMarketState] = useState([])
  const [account, setAccount] = useState()
  const router = useRouter()
  const [add, setAdd] = useState()

  const [activeToggle, setActiveToggle] = useState('Trade')

  const { id } = router.query

  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const refreshData = () => {
    router.replace(router.asPath)
    setIsRefreshing(true)
  }
  const executeScroll = () => { myRef?.current?.scrollIntoView() }

  async function loadMarket(id: number) {
      const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

      try {
        await getMarket(web3, id)
        
        setIsRefreshing(true)
      } catch (error) {
        setIsRefreshing(true)
      }

      const user = localStorage.getItem('user')
      
      setAccount(user)
    }

  useEffect(() => {
    setIsRefreshing(false)
  }, [props])

  useEffect(()=>{executeScroll()},[market])


  //s
  // useEffect(() => {
  
  //     loadMarket(id)
  
  // }, [account, market, id])

  useEffect(() => {
    loadMarket(id)
  },[])

  const getMarket = async (web3, address) => {
    const market = await getSingleMarket(web3, address)

    setMarketState(market)
  }

  const returnTabs = () => {
    switch (activeToggle) {
      case 'Trade':
        return (
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
        </BuySell>);

      case 'Liquidity':
        return (
          <AddLiquidity>
                  <LiquidityPanel data={market[0]} />
                </AddLiquidity>
        )

      // case 'closed':
      //   return <ResolvedAndClosedMarkets data={[]} />
    }
  }

  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <div style={market_id_styles.imageContainer}>
      <ToastContainer hideProgressBar={true} autoClose={3000} />
      <Navbar folder={"market"}/>
      {/*   {isRefreshing && (
        <h2 style={{ color: 'white' }}>
          Oops, seems that something went wrong while fetching your market,
          check that you have inserted correct address and try again
        </h2>
      )} */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        
      {market.length > 0 ? (
        
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center", maxWidth:"80%"}}>
            
            <BodyContainer>
            <BackButton onClick={() => router.back()} ><ArrowBackIcon />Go Back</BackButton>
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
                    <FlexItemTransparent flex="80%" >
                    <div style={{marginBottom:10}}> 
                     <InfoPanel1 data={market[0]} />
                    </div>
               
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
                  </FlexItemTransparent>
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
            
            <BodyContainer >
              <Row>
                    
                <FlexItem flex="100%">
                <ButtonRow id="markets" >
          
          <TabButtonContainer style={marketStyles.tabButtonContainer}> 
          <TogButton
              style={{ ...marketStyles.tabButton1, backgroundColor: activeToggle == 'Trade' ? '#E73B22' : 'transparent', }}
            onClick={() => setActiveToggle('Trade')}
          >
            Trade
           </TogButton>
          <TogButton
              style={{...marketStyles.tabButton2, backgroundColor: activeToggle == 'Liquidity' ? '#E73B22' : 'transparent', }}
            onClick={() => setActiveToggle('Liquidity')}
          >
            Liquidity
          </TogButton>
        
          </TabButtonContainer>
        </ButtonRow>

                </FlexItem>
              </Row>
              
              <Row ref={myRef}>
                  {returnTabs()}
              </Row>
            </BodyContainer>

          {/* <div class="container navigation mt-2">
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
          </div> */}

          
          </div>
          
        
      ) : (
        !isRefreshing && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight:"100vh"
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                // paddingTop: '200px',
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
      {isRefreshing ? (<FooterFixed />) : null}
      
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

const TabButtonContainer = styled.div`
  display:flex; background: rgba(255, 255, 255, 0.2); padding: 8px; padding-left:10px;padding-right:10px; border-radius:40px; width:40%;
  @media(max-width: 768px) {
   width:100%
  }
`

const BackButton = styled.div`
   color:#ffffff;
   cursor:pointer;
   width:max-content;
   &:hover {
     color:#E73B22;
   }
`

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
  @media (max-width: 768px){
    flex-direction: column;
  }
`

const FlexItem = styled.div`
  flex: ${(props) => props.flex || '50%'};
  column-gap: 20px;
  @media (max-width: 768px) {
    flex: 50%;
  }
`

const FlexItemTransparent = styled.div`
  flex: ${(props) => props.flex || '50%'};
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(255,255,255,.2);
  @media (max-width: 768px) {
    flex: 50%;
  }
`

const FlexWrappedItem = styled.div`
  flex: ${(props) => props.flex || '50%'};
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex: 100%;
  }
`

const ButtonRow = styled.div`
  display: flex;
  padding-top: 25px;
  justify-content: flex-start;
  position: relative;
  z-index:10;
  @media(max-width: 768px) {
    justify-content: center;
  }

`
export const TogButton = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: white;
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
  font-size: 15px;
  color: "#ffffff";

  @media(max-width: 768px) {
    font-size: 12px;
    padding: 6px 20px;
  }

  @media(max-width: 375px) {
    font-size: 10px;
    padding: 6px 5px;
  }

`

