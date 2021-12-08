import React, { useEffect } from 'react'
import styled from 'styled-components'
import { H4Bold_NoScale } from '../shared/Text'
import { formatBigNumber } from '../../utils/numbers'
const InfoPanelShares = (props) => {
  const shares = props.shares || ''
  const price = props.priceShare || ''
  const type = props.type
  const share = type === 'NO' ? 0 : 1
  const formatNumber = (val: number) => {
    return parseFloat(val).toFixed(2)
  }

  return (
    <PanelContainer>
      <FlexRow>
        <div>
          <H4Bold_NoScale color="#616F7C">Share</H4Bold_NoScale>
          <H4Bold_NoScale fontSize="15px">{type}</H4Bold_NoScale>
        </div>
      </FlexRow>
      <FlexRow>
        <div>
          <H4Bold_NoScale color="#616F7C">Balance</H4Bold_NoScale>
          <H4Bold_NoScale fontSize="15px">
            {formatNumber(formatBigNumber(shares))}
          </H4Bold_NoScale>
        </div>
        <div>
          <H4Bold_NoScale color="#616F7C">Value(UNT)</H4Bold_NoScale>
          <H4Bold_NoScale fontSize="15px">
            {formatNumber(price * formatBigNumber(shares))}
          </H4Bold_NoScale>
        </div>
      </FlexRow>
    </PanelContainer>
  )
}

export default InfoPanelShares

const PanelContainer = styled.div`
  background: #212d38;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 5px;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 25px;
  }
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 25px;
`

const HeaderText = styled.div`
  color: #616f7c;
`

const UNT = styled.div`
  background: #1f1f1f;
  border-radius: 5px;
  color: #d85439;
  padding: 2px 6px;
`
