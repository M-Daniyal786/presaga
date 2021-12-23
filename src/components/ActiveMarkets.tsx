import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { ComponentContainer } from './shared/Containers'
import { H2, H4Bold } from './shared/Text'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import { GiCrownCoin } from 'react-icons/gi'
import { IoIosArrowForward } from 'react-icons/io'
import { useRouter } from 'next/router'
import { Pagination } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {makeStyles} from "@mui/styles"

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  pagination: {
    background: "rgba(255,255,255,.1)",
    padding: 10,
    borderRadius:10
    
  }
}));

const formatNumber = (val: number) => {
  return parseFloat(val).toFixed(2)
}

const AktiveMarkets = (props) => {
  const classes = useStyles();
  const router = useRouter()
  const {search} = props
  const data = props.data
  console.log(data, "data")
  const [page, setPage] = React.useState(1);

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  return (
    <ThemeProvider theme={theme}>
    <ComponentContainer>
      <div class="active-market-heading">
        <h1>Active Markets</h1>
      </div>

        {isMobile ? <MobileMarket data={data} searchText={search}/> : <DesktopMarket data={data} searchText={search} />}

        <div className={classes.root}>
          <Pagination className={classes.pagination} count={data.length%10===0 ? data.length/10 : data.length/10 +1} page={page} onChange={(event,val)=> setPage(val)} color="primary"   />
        </div>
      </ComponentContainer>
      </ThemeProvider>
  )
}

const  DesktopMarket = (props) => {
  const data = props.data
  const {searchText} = props
  const router = useRouter()
  return (
    <>
      <div class="col-12 activeMarketList">
        <div class="row headerOfTable">
          <div class="col-6 h4">Market</div>
          <div class="col-2 h4">Liquidity</div>
          <TransformedDiv className="col-1 h4">YES</TransformedDiv>
          <TransformedDiv className="col-1 h4">NO</TransformedDiv>
          <div class="col-2"></div>
        </div>
        <div style={{backgroundColor:"rgba(255, 255, 255, .2)",padding:30, borderRadius:50}}>
        {data.length > 0 ? (
          // data.map((m, idx) => {
          //   return (
          //     <div
          //       class="row marketRowItem shadow "
          //       style={{borderRadius:30,padding:"3%"}}
          //       onClick={() => {
          //         router.push({
          //           pathname: '/market/[id]',
          //           query: { id: m.address },
          //         })
          //       }}
          //     >
          //       <div class="col-6 marketItem">
          //         {/* <GiCrownCoin
          //           style={{
          //             fontSize: '22px',
          //             color: '#d85439',
          //             transform: 'rotate(60deg)',
          //           }}
          //         /> */}
          //         {m.question}
          //       </div>

          //       <div class="col-2 marketItem">{formatNumber(m.liquidity)}</div>

          //       <div class="col-1 marketItem">
          //         {parseFloat(m.yesPrice).toFixed(2)}
          //       </div>

          //       <div class="col-1 marketItem ">
          //         {parseFloat(m.noPrice).toFixed(2)}
          //       </div>

          //       <div class="col-2 marketItemIcon">
          //         Go to Market <IoIosArrowForward />
          //       </div>
          //     </div>
          //   )
          // })
          
        // }

        data.filter((item) => {
          if (searchText === "") {
            // console.log(item)
              return item;
          }
          else if(item.question.toLowerCase().includes(searchText.toLowerCase())){
              return item
          }

      }).map((m, idx) => {
          return (
            <div
              class="row marketRowItem shadow "
              style={{borderRadius:30,padding:"3%"}}
              onClick={() => {
                router.push({
                  pathname: '/market/[id]',
                  query: { id: m.address },
                })
              }}
            >
              <div class="col-6 marketItem">
                {/* <GiCrownCoin
                  style={{
                    fontSize: '22px',
                    color: '#d85439',
                    transform: 'rotate(60deg)',
                  }}
                /> */}
                {m.question}
              </div>

              <div class="col-2 marketItem">{formatNumber(m.liquidity)}</div>

              <div class="col-1 marketItem">
                {parseFloat(m.yesPrice).toFixed(2)}
              </div>

              <div class="col-1 marketItem ">
                {parseFloat(m.noPrice).toFixed(2)}
              </div>

              <div class="col-2 marketItemIcon">
                Go to Market <IoIosArrowForward />
              </div>
            </div>
          )
        })
        
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              
            }}
          >
            <Loader
              type="ThreeDots"
              color="#d85439"
              height={70}
              width={70}
              timeout={90000}
            />
            <H4Bold style={{ padding: '10px', color: '#d85439' }}>
              Fetching Markets ...{' '}
            </H4Bold>
          </div>
        )}
        </div>
      </div>
    </>
  )
}

const MobileMarket = (props) => {
  const data = props.data
  const {searchText} = props

  return (
    <Table>
      <Header>
        <MarketColumn>
          <H4Bold>Market</H4Bold>
        </MarketColumn>
        <Column>
          <H4Bold>Yes</H4Bold>
        </Column>
        <Column>
          <H4Bold>No</H4Bold>
        </Column>
      </Header>

      {data.filter((item) => {
        if (searchText === "") {
          // console.log(item)
          return item;
        }
        else if (item.question.toLowerCase().includes(searchText.toLowerCase())) {
          return item
        }

      }).map((m, idx) => {
        return (
          <Link key={idx} href={`/market/${m.address}`}>
            <Row>
              <MarketColumn>
                <H4Bold>{m.question}</H4Bold>
              </MarketColumn>
              <Column>
                <H4Bold>{parseFloat(m.noPrice).toFixed(2)}</H4Bold>
              </Column>
              <Column>
                <H4Bold>{parseFloat(m.yesPrice).toFixed(2)}</H4Bold>
              </Column>
            </Row>
          </Link>
        )
      })}

      {/* {data.map((m, idx) => {
        return (
          <Link key={idx} href={`/market/${m.address}`}>
            <Row>
              <MarketColumn>
                <H4Bold>{m.question}</H4Bold>
              </MarketColumn>
              <Column>
                <H4Bold>{parseFloat(m.noPrice).toFixed(2)}</H4Bold>
              </Column>
              <Column>
                <H4Bold>{parseFloat(m.yesPrice).toFixed(2)}</H4Bold>
              </Column>
            </Row>
          </Link>
        )
      })} */}
    </Table>
  )
}

export default AktiveMarkets

const Table = styled.div`
  padding-top: 50px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
const Header = styled.div`
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

const Row = styled.div`
  display: flex;

  //background: linear-gradient(180deg, #293847 0%, rgba(41, 56, 71, 0) 100%);
  background: #293847;
  border-style: solid;
  //border-color: #d85439;
  border-width: 0.5px;
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
  border-radius: 25px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
  }
`

const MarketColumn = styled.div`
  display: flex;
  flex: 1 0 30%;
`

const Column = styled.div`
  display: flex;
  flex: 1;
`

const UNT = styled.div`
  background: #1f1f1f;
  border-radius: 5px;
  color: #d85439;
  padding: 2px 6px;
`

const TransformedDiv = styled.div`
  transform: translateX(-25%);
`
