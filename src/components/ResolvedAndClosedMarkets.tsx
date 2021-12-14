import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import { ComponentContainer } from './shared/Containers'
import { H2, H4Bold } from './shared/Text'

const ResolvedAndClosedMarkets = (props) => {
  const data = props.data
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  return (
    <ComponentContainer>
      {data.length > 0 ? (
        <>
          <H2>Resolved and Closed markets</H2>
          {isMobile ? (
            <MobileMarket data={data} />
          ) : (
            <DesktopMarket data={data} />
          )}{' '}
        </>
      ) : (
        <h2 style={{ padding: '20px', color: 'gray', height:"50vh" }}>
          No closed markets yet
        </h2>
      )}
    </ComponentContainer>
  )
}

const DesktopMarket = (props) => {
  const data = props.data

  return (
    <Table>
      <Header>
        <MarketColumn>
          <H4Bold>Market</H4Bold>
        </MarketColumn>
        <Column>
          <H4Bold>Liquidity</H4Bold>
        </Column>
        <Column>
          <H4Bold>Expiration</H4Bold>
        </Column>
      </Header>
      {data.map((m, idx) => {
        return (
          <Link key={idx} href={`/market/${m.id}`}>
            <Row>
              <MarketColumn>
                <H4Bold>{m.title}</H4Bold>
              </MarketColumn>
              <Column>
                <H4Bold>
                  <UNT>5.00 UNT</UNT>
                </H4Bold>
              </Column>
              <Column>
                <H4Bold>
                  {new Date(Date(m.endDate)).toLocaleDateString()}
                </H4Bold>
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

  return (
    <Table>
      <Header>
        <MarketColumn>
          <H4Bold>Market</H4Bold>
        </MarketColumn>
        <Column>
          <H4Bold>Expiration</H4Bold>
        </Column>
      </Header>
      {data.map((m, idx) => {
        return (
          <Link key={idx} href={`/market/${m.id}`}>
            <Row>
              <MarketColumn>
                <H4Bold>{m.title}</H4Bold>
              </MarketColumn>
              <Column>
                <H4Bold>
                  {new Date(Date(m.endDate)).toLocaleDateString()}
                </H4Bold>
              </Column>
            </Row>
          </Link>
        )
      })}
    </Table>
  )
}

export default ResolvedAndClosedMarkets

const Table = styled.div`
  padding-top: 50px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
const Header = styled.div`
  display: flex;

  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

const Row = styled.div`
  display: flex;

  background: linear-gradient(180deg, #293847 0%, rgba(41, 56, 71, 0) 100%);
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
  border-radius: 25px;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 35px;
  padding-top: 35px;
  margin-top: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
  }
`

const MarketColumn = styled.div`
  display: flex;
  flex: 1 0 70%;
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
