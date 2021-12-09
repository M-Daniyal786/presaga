import React, { useRef } from 'react'
import styled from 'styled-components'
import { LinkButton } from './shared/Buttons'
import { ComponentContainer } from './shared/Containers'
import Elipse from './shared/Elipse'
import { H2, H3 } from './shared/Text'
import ScrollContainer from 'react-indiana-drag-scroll'

const WaysToEarn = () => {
  return (
    <div style={{ width: '100%' }}>
      <div id="setMainBody">
        <div className="three">
          <h1> How PreSaga Works?</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <img style={{ width: '40px', height: '40px' }} src="hand.png" />
            <span style={{ color: 'white', fontSize: '20px' }}>
              Slide to right
            </span>
          </div>
        </div>

        <div className="scroll-container">
          <div className="gridscroll">
            <img className="ImgWorkFlow" src="workflow.png" loading="lazy" />
          </div>
        </div>
      </div>

      <div id="preSaga">
        <div id="twoWays">
          <div id="headingWays">
            <span id="headingOne" style={{ fontFamily: 'Raleway' }}>
              Two ways you
            </span>
            <span id="headingOne">
              can earn using <strong id="strongTag">PreSaga</strong>
            </span>
            <span id="paraWays">
              Accurately predict the outcomes of existing {'\n'} markets via the
              purchase of market-specific <strong id="strongTag"> YES </strong>{' '}
              or <strong id="strongTag">NO</strong> shares.
            </span>
          </div>
          <img id="imgOne" src="oneway.png" />
        </div>

        <div id="sectionTwo">
          <img id="imgTwo" src="twoway.png" />
          <div id="sectionTwoSet">
            <span id="spanHead" style={{ fontFamily: 'Raleway' }}>
              Collect liquidity
            </span>
            <span
              id="spanHeadTwo"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              provider fees by adding liquidity, in the form of{' '}
              <strong id="strongTag">UNT</strong>, to active markets.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaysToEarn

const Title = styled.div`
  line-height: 60px;
  color: #ffffff;
  font-size: 28px;
  width: 100%;
  text-align: center;
`

const ElipseStyled = styled(Elipse)`
  margin: auto;
  margin-top: -38px;
`

const ReactangleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4%;
`

const Rectangle = styled.div`
  margin-top: 86px;
  background: linear-gradient(180deg, #293847 0%, rgba(41, 56, 71, 0) 100%);
  filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
  border-radius: 25px;
  flex: 48%;
  @media (max-width: 768px) {
    flex: 100%;
  }
`

const ReactangleText = styled(H3)`
  padding-top: 35px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 49px;
  font-size: 20px;
  line-height: 44px;
  @media (max-width: 768px) {
    line-height: 25px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 50px;
  justify-content: center;
  @media (max-width: 768px) {
    justify-content: center;
  }
`
