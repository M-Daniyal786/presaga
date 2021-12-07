import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../shared/Buttons'
import BuyPanel from './BuyPanel'
import SellPanel from './SellPanel'
import { H3_NoScale, H4Bold_NoScale } from '../../shared/Text'

const YES_SHARE = 'Yes'
const NO_SHARE = 'No'
const BUY = 'Buy'
const SELL = 'Sell'

const ClosedPanel = (props) => {
  const data = props.data
  const [selectedTab, setSelectedTab] = useState(BUY)
  const [selectedShare, setSelectedShare] = useState(YES_SHARE)
  return (
    <PanelContainer>
      <ContentContainer>
        <TextWrapper>Market is closed</TextWrapper>
        <Shares>
          <Share
            selected={selectedShare == YES_SHARE}
            selectedColor="#1CC27C"
            onClick={() => setSelectedShare(YES_SHARE)}
          >
            <H4Bold_NoScale fontSize="18px">{YES_SHARE}</H4Bold_NoScale>
            <H4Bold_NoScale fontSize="18px">1.00 UNT</H4Bold_NoScale>
          </Share>
          <Share
            selected={selectedShare == NO_SHARE}
            selectedColor="#ed362a"
            onClick={() => setSelectedShare(NO_SHARE)}
          >
            <H4Bold_NoScale fontSize="18px">{NO_SHARE}</H4Bold_NoScale>
            <H4Bold_NoScale fontSize="18px">0.00 UNT</H4Bold_NoScale>
          </Share>
        </Shares>

        <SubmitContainer>
          <Button>Redeem winning shares</Button>
        </SubmitContainer>
      </ContentContainer>
    </PanelContainer>
  )
}

export default ClosedPanel
const PanelContainer = styled.div`
  background: #212d38;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
`

const TextWrapper = styled(H4Bold_NoScale)`
  display: flex;
  justify-content: center;
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
  padding-top: 25px;
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
  min-height: 55px;
  background: ${(props) => (props.selected ? props.selectedColor : '#344351')};
  padding: 0 20px;
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
