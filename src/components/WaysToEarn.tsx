import React from 'react'
import styled from 'styled-components'
import { LinkButton } from './shared/Buttons'
import { ComponentContainer } from './shared/Containers'
import Elipse from './shared/Elipse'
import { H2, H3 } from './shared/Text'

const WaysToEarn = () => {
  return (
    <div>
      <div class="three">
        <h1> How PreSaga Works?</h1>
      </div>
      <img
        src="presaga_explained.png"
        class="d-block mx-lg-auto img-fluid"
        alt="Bootstrap Themes"
        width={'100%'}
        height={'100%'}
        loading="lazy"
      />

      <div class="three">
        <h1> Two ways you can earn using PreSaga</h1>
      </div>

      <div class="container col-xxl-8 px-3 py-2">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="undraw_crypto_portfolio_2jy5.svg"
              class="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3"></h1>
            <p class="lead">
              Accurately predict the outcomes of existing markets via the
              purchase of market-specific <span class="yes_or_no">YES </span> or{' '}
              <span class="yes_or_no">NO </span> shares.
            </p>
          </div>
        </div>
      </div>

      <div class="container col-xxl-8 px-3 py-2">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3"></h1>
            <p class="lead">
              Collect liquidity provider fees by adding liquidity, in the form
              of UNT, to active markets.
            </p>
          </div>
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="undraw_wallet_aym5.svg"
              class="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div class="col-12 text-center">
        <button
          type="button"
          class="btn btn-primary btn-lg learn_more"
          href="https://unitynetwork.medium.com/presaga-a-summary-of-unity-networks-first-dapp-6012f84693a8"
          target="_blank"
        >
          Learn more{' '}
        </button>
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
