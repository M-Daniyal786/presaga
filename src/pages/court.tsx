import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { ComponentContainer } from '../components/shared/Containers'
import { H2, H4Bold } from '../components/shared/Text'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import { Button } from '../components/shared/Buttons'
import Navbar from '../components/navbar/Navbar'
import Modal from '../components/modal'
import Footer from '../components/Footer'
import {AiOutlinePlusSquare} from 'react-icons/ai'
const Court = () => {
  //const data = props.data
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  return (
    <>
      <Navbar />
      <ComponentContainer>
        <div class="row">
          <div class="three "><h1>Markets in Dispute </h1></div>
        </div>
        

        {isMobile ? <MobileMarket /> : <DesktopMarket />}
      </ComponentContainer>
      <Footer />
    </>
  )
}

const DesktopMarket = (props) => {
  //const data = props.data
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Modal onClose={() => setShowModal(false)} show={showModal} />

      <div class="row shadow justify-content-center align-items-center courtHeader">
        <div class="col-8">
          <div class="row header text-center">
            <div class="col-6">Market</div>
            <div class="col-3">Total Staked on YES </div>
            <div class="col-3">Total Staked on NO </div>
          </div>
          <div class="row content text-center">
            <div class="col-6">Is this a metaverse?</div>
            <div class="col-3">{900} UNT </div>
            <div class="col-3">{300} UNT </div>
          </div>
        </div>
        
        <div class="col-4  align-items-center text-center">
                <Button onClick={() => setShowModal(true)}>
                    Stake on right outcome
                  </Button>
        </div>
      </div>

      <div class="row align-items-center justify-content-center h-100 tableContent">
        <div class="col-xl-7">
          <div class="col-12 activeMarketList">
            <div class="row headerOfTable">
              <div class="col-5">Address</div>
              <div class="col-2">Staked on</div>
              <div class="col-4 ">Provided proof</div>
              <div class="col-1" >
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#court" aria-expanded="false" >
                  <AiOutlinePlusSquare />
                </button>
                
              </div>
            </div>
                  <div class="" id="court">
                    <div class=" ">
                      <div class="row marketRowItem shadow rounded">
                        <div class="col-6 marketItem">0xaBjdejhde...3NBD8</div>
                      
                        <div class="col-1 marketItem yes_or_no">YES</div>
                      
                        <div class="col-1 marketItem yes_or_no">https://www.bbc.com/tech/now</div>
                      </div>
                      <div class="row marketRowItem shadow rounded">
                        <div class="col-6 marketItem">0xaBjdejhde...3NBD8</div>
                      
                        <div class="col-1 marketItem yes_or_no">YES</div>
                      
                        <div class="col-1 marketItem yes_or_no">https://www.bbc.com/tech/now</div>
                      </div>
                      <div class="row marketRowItem shadow rounded">
                        <div class="col-6 marketItem">0xaBjdejhde...3NBD8</div>
                      
                        <div class="col-1 marketItem yes_or_no">YES</div>
                      
                        <div class="col-1 marketItem yes_or_no">https://www.bbc.com/tech/now</div>
                      </div>
                    </div>
                  </div>
          </div>
        </div>
        </div>
    </>
  )
}

const MobileMarket = () => {
  //const data = props.data

  return (
    <Table>
      <Header>
        <MarketColumn>
          <H4Bold>Market</H4Bold>
        </MarketColumn>
        <Column>
          <H4Bold>Total Staked UNT</H4Bold>
        </Column>
      </Header>

      <Row>
        <MarketColumn>
          <H4Bold>is this a metaverse? </H4Bold>
        </MarketColumn>
        <Column>
          <H4Bold>100000</H4Bold>
        </Column>
      </Row>
    </Table>
  )
}

export default Court

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
const StakingHeader = styled.div`
  display: flex;
  width: 100%;
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

  border-radius: 25px;
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

const StakingRow = styled.div`
  display: flex;

  background: rgba(41, 56, 71, 0);

  border-radius: 25px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 35px;
  padding-top: 35px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;

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
  padding: 4px 8px;
`
