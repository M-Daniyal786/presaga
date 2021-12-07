import React from 'react'
import styled from 'styled-components'
import { ComponentContainer } from './shared/Containers'
import Elipse from './shared/Elipse'
import { H2, H3 } from './shared/Text'
import {BsFillMouse3Fill} from 'react-icons/bs'
import {BiNetworkChart} from 'react-icons/bi'
import {RiVipLine} from 'react-icons/ri'
import {VscServerEnvironment} from 'react-icons/vsc'
import {GiClick, GiCrownCoin} from 'react-icons/gi'

const KeyAspects = () => {
  return (
    <ComponentContainer>
      <div class="three"><h1>Key aspects </h1></div>
      

  <div class="container px-4 py-5" id="featured-3">
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col keyAspectsText">
        <div class="feature-icon  keyAspectsIcons">
          <GiClick  />
        </div>
        <h3>Two-click trade interface</h3>
      </div>
      
      <div class="feature col keyAspectsText">
      <div class="feature-icon  keyAspectsIcons">
      <VscServerEnvironment  />
        </div>
        <h3>Constant Product Market Maker providing a seamless and instant
            traing experience</h3>
      </div>
      <div class="feature col keyAspectsText">
        <div class="feature-icon  keyAspectsIcons">
          <GiCrownCoin  style={{transform:'rotate(60deg)'}}/>
        </div>
        <h3>UNT token as trade currency across all markets</h3>
      </div>
    </div>
  </div>

  <div class="col-12 text-center"> 
      <button type="button" class="btn btn-primary btn-lg learn_more" href="https://unitynetwork.medium.com/presaga-a-summary-of-unity-networks-first-dapp-6012f84693a8"
          target="_blank">Start Trading Now </button>
  </div>
    </ComponentContainer>
  )
}

export default KeyAspects

const AspectContainer = styled.div`
  display: flex;
  border-style: solid;
  border-color: #d85439;
  border-radius: 25px;
  padding-right: 20px;
  border-width: 0.1rem;
  padding-left: 20px;
  padding-bottom: 65px;
  flex-wrap: wrap;
  padding-top: 65px;
  row-gap: 50px;
  @media (max-width: 768px) {
    row-gap: 25px;
    padding-top: 25px;
  }
`

const Aspect = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const AspectText = styled(H3)`
  padding-left: 25px;
  padding-right: 25px;
`

const ElipseStyled = styled(Elipse)`
  flex-shrink: 0;
`

const ButtonRow = styled.div`
  display: flex;
  padding-top: 100px;
  justify-content: center;
  @media (max-width: 768px) {
    padding-top: 25px;
  }
`
export const Button = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    background-color: #293847;
    color: #d85439;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0);
  }
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 40px;

  background: #d85439;
  box-shadow: 0px 2px 20px rgba(216, 84, 57, 0.7);
  border-radius: 25px;

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;
`
