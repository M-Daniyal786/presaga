import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { ComponentContainer } from './shared/Containers'
import { H2, H4Bold } from './shared/Text'
import { formatBigNumber } from '../utils/numbers'

const MyMarkets = (props) => {
  const data = props.data
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  return (
    <ComponentContainer>
      {data.length > 0 ? (
        <>
          <H2>My markets</H2>
          {isMobile ? (
            <MobileMarket data={data} />
          ) : (
            <DesktopMarket data={data} />
          )}
        </>
      ) : (
        <div>
          <H4Bold style={{ padding: '10px', color: '#d85439', height:"50vh"}}>
            No markets found for you, connect your wallet and start trading now!
          </H4Bold>
        </div>
      )}
    </ComponentContainer>
  )
}

const DesktopMarket = (props) => {
  const data = props.data
  const formatNumber = (val: number) => {
    return parseFloat(val).toFixed(2)
  }
  return (
    <Table>
      <Header>
        <MarketColumn>
          <H4Bold>Market</H4Bold>
        </MarketColumn>
        <Column>
          <H4Bold>Yes Shares</H4Bold>
        </Column>
        <Column>
          <H4Bold> No Shares</H4Bold>
        </Column>
        <Column>
          <H4Bold>Liquidity </H4Bold>
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
                <H4Bold>
                  {formatNumber(formatBigNumber(m.userShares[1]))}
                </H4Bold>
              </Column>
              <Column>
                <H4Bold>
                  {formatNumber(formatBigNumber(m.userShares[0]))}
                </H4Bold>
              </Column>
              <Column>
                <H4Bold>{formatNumber(m.accountLiquidity)}</H4Bold>
              </Column>
            </Row>
          </Link>
        )
      })}
    </Table>
  )
}

const MobileMarket = (props) => {
  const data = props.data
  const formatNumber = (val: number) => {
    return parseFloat(val).toFixed(2)
  }
  return (
    <Table>
      <Header>
        <MarketColumn>
          <H4Bold>Market</H4Bold>
        </MarketColumn>
        <Column>
          <H4Bold>Yes Shares</H4Bold>
        </Column>
        <Column>
          <H4Bold>No Shares</H4Bold>
        </Column>
        <Column>
          <H4Bold>Liquidity</H4Bold>
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
                <H4Bold>
                  {' '}
                  {formatNumber(formatBigNumber(m.userShares[1]))}
                </H4Bold>
              </Column>
              <Column>
                <H4Bold>
                  {' '}
                  {formatNumber(formatBigNumber(m.userShares[0]))}
                </H4Bold>
              </Column>
              <Column>
                <H4Bold>{formatNumber(m.accountLiquidity)}</H4Bold>
              </Column>
            </Row>
          </Link>
        )
      })}
    </Table>
  )
}

export default MyMarkets

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
  cursor: pointer;
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
