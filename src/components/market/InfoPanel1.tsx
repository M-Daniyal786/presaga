import React from 'react'
import styled from 'styled-components'
import { H4Bold_NoScale } from '../shared/Text'
const formatNumber = (val: number) => {
  return parseFloat(val).toFixed(2)
}

const InfoPanel1 = (props) => {
  const data = props.data
  return (
    <PanelContainer>
      <div>
        {window.innerWidth < 480 ? (<H4Bold_NoScale fontSize="15px" color="#FFFFFF">Expiration</H4Bold_NoScale>) :( <H4Bold_NoScale color="#FFFFFF">Expiration</H4Bold_NoScale>)}
       
        <H4Bold_NoScale>
          {/* {new Date(Date(data.endDate)).toLocaleDateString()} */}
        </H4Bold_NoScale>
      </div>
      <FlexRow>
        <div>
          {window.innerWidth < 480 ? (<H4Bold_NoScale fontSize="15px" color="#FFFFFF">Volume</H4Bold_NoScale>) : <H4Bold_NoScale color="#FFFFFF">Volume</H4Bold_NoScale>}
          <H4Bold_NoScale fontSize="15px" style={{ marginRight: '2px' }}>
            {formatNumber(
              data?.noSupply * data?.noPrice +
                data?.yesSupply * data?.yesPrice -
                data?.liquidity
            )}{' '}
            UNT
          </H4Bold_NoScale>
        </div>
        <div>
          {window.innerWidth < 480 ? <H4Bold_NoScale fontSize="15px" color="#FFFFFF">Liquidity</H4Bold_NoScale> : <H4Bold_NoScale color="#FFFFFF">Liquidity</H4Bold_NoScale>}
          <H4Bold_NoScale fontSize="15px">{formatNumber(data?.liquidity)} UNT</H4Bold_NoScale>
        </div>
      </FlexRow>
    </PanelContainer>
  )
}

export default InfoPanel1

const PanelContainer = styled.div`
  background: #E73B22;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 12px;

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
  column-gap: 40px;
`
