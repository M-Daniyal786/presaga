import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../shared/Buttons'
import BuyPanel from './BuyPanel'
import SellPanel from './SellPanel'
import { H3_NoScale, H4Bold_NoScale } from '../../shared/Text'
import { ToastContainer, toast } from 'react-toastify'
const YES_SHARE = 'Yes'
const NO_SHARE = 'No'
const BUY = 'Buy'
const SELL = 'Sell'

const BuySellPanel = (props) => {
  const data = props.data
  const [selectedTab, setSelectedTab] = useState(BUY)
  const [selectedShare, setSelectedShare] = useState(YES_SHARE)

  const formatNumber = (val: number) => {
    return parseFloat(val).toFixed(2)
  }
  return (
    <PanelContainer>
      <ToastContainer />
      <Tabs>
        <Tab
          selected={selectedTab == BUY}
          onClick={() => setSelectedTab(BUY)}
          borderRadius="15px 0px 0px 0px"
        >
          <H3_NoScale
            fontSize="20px"
            color={selectedTab == BUY ? '#D85439' : ''}
          >
            {BUY}
          </H3_NoScale>
        </Tab>
        <Tab
          selected={selectedTab == SELL}
          onClick={() => setSelectedTab(SELL)}
          borderRadius="0px 25px 0px 0px"
        >
          <H3_NoScale
            fontSize="20px"
            color={selectedTab == SELL ? '#D85439' : ''}
          >
            {SELL}
          </H3_NoScale>
        </Tab>
      </Tabs>

      <ContentContainer>
        <Shares>
          <Share
            selected={selectedShare == YES_SHARE}
            selectedColor="#1CC27C"
            onClick={() => setSelectedShare(YES_SHARE)}
          >
            <H4Bold_NoScale fontSize="18px">{YES_SHARE}</H4Bold_NoScale>
            <H4Bold_NoScale fontSize="18px">
              {formatNumber(data?.yesPrice)}
            </H4Bold_NoScale>
          </Share>
          <Share
            selected={selectedShare == NO_SHARE}
            selectedColor="#ed362a"
            onClick={() => setSelectedShare(NO_SHARE)}
          >
            <H4Bold_NoScale fontSize="18px">{NO_SHARE}</H4Bold_NoScale>
            <H4Bold_NoScale fontSize="18px">
              {formatNumber(data?.noPrice)}
            </H4Bold_NoScale>
          </Share>
        </Shares>

        {selectedTab == BUY ? (
          <BuyPanel selectedShare={selectedShare} data={data} />
        ) : (
          <SellPanel selectedShare={selectedShare} data={data} />
        )}

        {/*   <SubmitContainer>
          <Button>Submit</Button>
        </SubmitContainer> */}
      </ContentContainer>
    </PanelContainer>
  )
}

export default BuySellPanel
const PanelContainer = styled.div`
  background: #212d38;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
  width: 500px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Tabs = styled.div`
  display: flex;
`

const Tab = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  //height: 128px;
  padding: 10px;
  //border-radius: ${(props) => props.borderRadius || ''};
  background: ${(props) => (props.selected ? '#293847' : '#212D38')};
  // border-bottom: ${(props) => (props.selected ? '#D85439 solid 4px;' : '')};
  cursor: pointer;

  &:hover {
    filter: ${(props) => (!props.selected ? 'brightness(1.15)' : '')};
  }
`
const ContentContainer = styled.div`
  padding-top: 55px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 50px;
  @media (max-width: 768px) {
    padding-top: 25px;
    padding-bottom: 25px;
  }
`

const Shares = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 50px;
  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 15px;
  }
`
const Share = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  //min-height: 55px;
  background: ${(props) => (props.selected ? props.selectedColor : '#344351')};
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: ${(props) => (!props.selected ? props.selectedColor : '')};
    opacity: ${(props) => (!props.selected ? '.3' : '')};
  }
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
