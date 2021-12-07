import React from 'react'
import styled from 'styled-components'
import Elipse from '../shared/Elipse'
import { H4Bold_NoScale } from '../shared/Text'

const InfoPanel2 = (props) => {
  const data = props.data
  return (
    <PanelContainer>
      <FlexRow>
        <ElipseWrapper
          className="graph"
          width="52px"
          height="52px"
          iconSrc="/chain.png"
          iconHeight="24px"
          iconWidth="24px"
        />
        <H4Bold_NoScale fontSize="15px">
          Every market has its own resolution source. Should an issue arise with
          the outcome settlement for a given market, it will be analysed and
          settled by a committee of specifically-appointed members from the
          Unity Network Foundation.
        </H4Bold_NoScale>
      </FlexRow>
      <FlexRow>
        <Elipse
          className="graph"
          width="52px"
          height="52px"
          iconSrc="/goto.png"
          iconHeight="36px"
          iconWidth="36px"
        />
        <H4Bold_NoScale fontSize="15px">
          Resolution source:{' '}
          <Link /* href={data.resolutionSource} */>
            {/* {data.resolutionSource} */}
          </Link>
        </H4Bold_NoScale>
      </FlexRow>
    </PanelContainer>
  )
}

export default InfoPanel2

const PanelContainer = styled.div`
  background: #212d38;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  row-gap: 25px;

  @media (max-width: 768px) {
    display: none;
  }
`

const FlexRow = styled.div`
  display: flex;
  column-gap: 25px;
  align-items: center;
`

const ElipseWrapper = styled(Elipse)`
  align-self: baseline;
  flex-shrink: 0;
`

const Link = styled.a`
  color: #d85439;
  text-decoration-line: underline;
  text-underline-offset: 5px;
`
