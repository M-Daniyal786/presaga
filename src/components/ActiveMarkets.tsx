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

const formatNumber = (val: number) => {
  return parseFloat(val).toFixed(2)
}

const AktiveMarkets = (props) => {
  const router = useRouter()
  const data = props.data
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  return (
    <ComponentContainer>
      <div class="three">
        <h1>Active Markets</h1>
      </div>

      {isMobile ? <MobileMarket data={data} /> : <DesktopMarket data={data} />}
    </ComponentContainer>
  )
}

const DesktopMarket = (props) => {
  const data = props.data
  const router = useRouter()
  return (
    <>
      <div class="col-12 activeMarketList">
        <div class="row headerOfTable">
          <div class="col-6">Market</div>
          <div class="col-2">Liquidity</div>
          <div class="col-1 yes_or_no">YES</div>
          <div class="col-1 yes_or_no">NO</div>
          <div class="col-2"></div>
        </div>
        {data.length > 0 ? (
          data.map((m, idx) => {
            return (
              <div
                class="row marketRowItem shadow rounded"
                onClick={() => {
                  router.push({
                    pathname: '/market/[id]',
                    query: { id: m.address },
                  })
                }}
              >
                <div class="col-6 marketItem">
                  <GiCrownCoin
                    style={{
                      fontSize: '22px',
                      color: '#d85439',
                      transform: 'rotate(60deg)',
                    }}
                  />{' '}
                  {m.question}
                </div>

                <div class="col-2 marketItem">{formatNumber(m.liquidity)}</div>

                <div class="col-1 marketItem yes_or_no">
                  {parseFloat(m.yesPrice).toFixed(2)}
                </div>

                <div class="col-1 marketItem yes_or_no">
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
    </>
  )
}

const MobileMarket = (props) => {
  const data = props.data

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

      {data.map((m, idx) => {
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
