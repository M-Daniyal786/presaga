import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../shared/Buttons'
import { H3_NoScale } from '../../shared/Text'
import AddPanel from './AddPanel'
import RemovePanel from './RemovePanel'
import { ToastContainer, toast } from 'react-toastify'

const ADD = 'Add'
const REMOVE = 'Remove'

const LiquidityPanel = (props) => {
  const market = props.data
  const [selectedTab, setSelectedTab] = useState(ADD)

  return (
    <PanelContainer>
      <Tabs>
        <Tab
          selected={selectedTab == ADD}
          onClick={() => setSelectedTab(ADD)}
          borderRadius="15px 0px 0px 0px"
        >
          <H3_NoScale
            fontSize="20px"
            color={selectedTab == ADD ? '#D85439' : ''}
          >
            {ADD}
          </H3_NoScale>
        </Tab>
        <Tab
          selected={selectedTab == REMOVE}
          onClick={() => setSelectedTab(REMOVE)}
          borderRadius="0px 25px 0px 0px"
        >
          <H3_NoScale
            fontSize="20px"
            color={selectedTab == REMOVE ? '#D85439' : ''}
          >
            {REMOVE}
          </H3_NoScale>
        </Tab>
      </Tabs>

      {market.closed == true ? (
        <H3_NoScale style={{ padding: '50px' }}>
          Adding liquidity is temporarily suspended...
        </H3_NoScale>
      ) : (
        <ContentContainer>
          {selectedTab == ADD ? (
            <AddPanel data={market} />
          ) : (
            <RemovePanel data={market} />
          )}
        </ContentContainer>
      )}
    </PanelContainer>
  )
}

export default LiquidityPanel
const PanelContainer = styled.div`
  background: #212d38;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 15px;

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
  padding: 10px;
  //height: 128px;
  //border-radius: ${(props) => props.borderRadius || ''};
  background: ${(props) => (props.selected ? '#293847' : '#212D38')};
  //border-bottom: ${(props) => (props.selected ? '#D85439 solid 4px;' : '')};
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

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
