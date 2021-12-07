import React from 'react'
import styled from 'styled-components'
import { H4Bold_NoScale } from '../../shared/Text'

const NoLiquidityPanel = (props) => {
  return (
    <PanelContainer>
      <ContentContainer>
        <H4Bold_NoScale>Trading is disabled due to lack of liquidity.</H4Bold_NoScale>
      </ContentContainer>
    </PanelContainer>
  )
}

export default NoLiquidityPanel
const PanelContainer = styled.div`
  background: #212d38;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
`

const ContentContainer = styled.div`
  padding-top: 55px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    padding-top: 25px;
    padding-bottom: 25px;
  }
`
