import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { ComponentContainer } from './shared/Containers'
import Image from 'next/image'
import Elipse from './shared/Elipse'
import rocket from '../../public/rocket.png'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoMdArrowRoundForward } from 'react-icons/io'
import UnityLogo from "../../public/Unity_logo.png"

const KeyAspects = () => {
  const carouselRef = useRef(null)
  const items = [
    <div id="couresolSlider">
      <Image id="couresolSliderImg" src={UnityLogo}/>
      <div id="couresolSliderDiv">
        <span id="couresolSliderSpan" style={{ fontFamily: 'Raleway' }}>
          The Gateway Token Body
        </span>
        <span
          id="couresolSliderContent"
          style={{
            fontFamily: 'Poppins',
          }}
        >
          The UNT token powers all of Unity Network's dApps, including PreSaga. With it, you'll have access to Unity's growing ecosystem of decentralized finance applications.
        </span>
        <button
          style={{ marginTop: '20px', fontFamily: 'Poppins' }}
          id="btnBuy"
        >
          Buy Now
        </button>
      </div>
    </div>,
    <div id="couresolSlider">
      <Image id="couresolSliderImg" src={UnityLogo} />
      <div id="couresolSliderDiv">
        <span id="couresolSliderSpan" style={{ fontFamily: 'Raleway' }}>
        Value Over Time Body
        </span>
        <span
          id="couresolSliderContent"
          style={{
            fontFamily: 'Poppins',
          }}
        >
          The UNT token gains additional use cases and potential volume with each dApp Unity Network develops.
        </span>
        <button
          style={{ marginTop: '20px', fontFamily: 'Poppins' }}
          id="btnBuy"
        >
          Buy Now
        </button>
      </div>
    </div>,
    <div id="couresolSlider">
      <Image id="couresolSliderImg" src={UnityLogo} />
      <div id="couresolSliderDiv">
        <span id="couresolSliderSpan" style={{ fontFamily: 'Raleway' }}>
          Community Governance
        </span>
        <span
          id="couresolSliderContent"
          style={{
            fontFamily: 'Poppins',
          }}
        >
          The UNT token puts the power back in your hands. Holders have a say in what Unity Network develops via our community governance system.
        </span>
        <button
          style={{ marginTop: '20px', fontFamily: 'Poppins' }}
          id="btnBuy"
        >
          Buy Now
        </button>
      </div>
    </div>,
  ]

  const playNext = () => {
    console.log('Next')
    carouselRef.current.slideNext()
  }

  const playPrev = () => {
    console.log('Previous')
    carouselRef.current.slidePrev()
  }
  // console.log(carouselRef.current.slideNext)
  return (
    <div id="MainHeadingAspectKey">
      <div style={{ width: '100%' }}>
        <div id="keyAspectHeading">
          <span style={{ fontFamily: 'Raleway' }} id="keyAspectSpan">
            Key Aspects
          </span>
          <div id="btnStartDiv" style={{cursor:"pointer"}} onClick={() => {
            // playNext
            location.href = 'markets'
          }}>
            {/* <Image id="imgSetStart" src={rocket} alt="" /> */}
            <button id="btnStart">Start Trading Now </button>
          </div>
        </div>
        <div id="divSetAspectKey">
          <div id="contentDiv">
            <img
              style={{ width: '80px', height: '100px' }}
              src="key-aspects-01.png"
            />
            <span id="setAspectinnerheading" style={{ fontFamily: 'Poppins' }}>
              Two-click trade interface
            </span>
          </div>

          <div id="contentDiv">
            <img
              style={{ width: '100px', height: '100px' }}
              src="key-aspects-02.png"
            />
            <span id="setAspectinnerheading" style={{ fontFamily: 'Poppins' }}>
              Constant Product Market Maker providing a seamless and instant
              training experience
            </span>
          </div>

          <div id="contentDiv">
            <img
              style={{ width: '100px', height: '100px' }}
              src="key-aspects-03.png"
            />
            <span id="setAspectinnerheading" style={{ fontFamily: 'Poppins' }}>
              UNT token as trade currency across all markets
            </span>
          </div>
        </div>

        <div id="sliderHeading">
          <span id="sliderHeadingSpann" style={{ fontFamily: 'Raleway' }}>
            Buy Our Token
          </span>

          <div>
            {/* <IoMdArrowRoundBack
              size={70}
              style={{ color: 'white' }}
              onClick={playNext}
            />
            <IoMdArrowRoundForward
              size={70}
              style={{ color: 'white' }}
              onClick={playPrev}
            /> */}
          </div>
        </div>

        <div id="KeyAspectMainSliderDiv">
          <AliceCarousel
            ref={carouselRef}
            mouseTracking
            items={items}
            infinite
            controlsStrategy="alternate"
            autoPlay="true"
            animationDuration="3000"
            autoPlayInterval="4000"
            
          />
        </div>
      </div>
    </div>
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
