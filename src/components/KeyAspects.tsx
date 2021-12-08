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

const KeyAspects = () => {
  const carouselRef = useRef(null)
  const items = [
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '80px',
      }}
    >
      <img style={{ width: '25%' }} src="coin-01.png" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
        }}
      >
        <span
          style={{ fontSize: '60px', fontFamily: 'Raleway', color: 'white' }}
        >
          Token Name
        </span>
        <span
          style={{
            fontSize: '26px',
            fontFamily: 'Poppins',
            color: 'white',
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry lorem Ipsum has been the industry's standard dummy.
        </span>
        <button
          style={{ marginTop: '20px', fontFamily: 'Poppins' }}
          id="btnBuy"
        >
          Buy Now
        </button>
      </div>
    </div>,
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '80px',
      }}
    >
      <img style={{ width: '25%' }} src="coin-02.png" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
        }}
      >
        <span
          style={{ fontSize: '60px', fontFamily: 'Raleway', color: 'white' }}
        >
          Token Name
        </span>
        <span
          style={{
            fontSize: '26px',
            fontFamily: 'Poppins',
            color: 'white',
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry lorem Ipsum has been the industry's standard dummy.
        </span>
        <button
          style={{ marginTop: '20px', fontFamily: 'Poppins' }}
          id="btnBuy"
        >
          Buy Now
        </button>
      </div>
    </div>,
    <div
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '80px',
    }}
  >
    <img style={{ width: '25%' }} src="coin-03.png" />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
      }}
    >
      <span
        style={{ fontSize: '60px', fontFamily: 'Raleway', color: 'white' }}
      >
        Token Name
      </span>
      <span
        style={{
          fontSize: '26px',
          fontFamily: 'Poppins',
          color: 'white',
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry lorem Ipsum has been the industry's standard dummy.
      </span>
      <button
        style={{ marginTop: '20px', fontFamily: 'Poppins' }}
        id="btnBuy"
      >
        Buy Now
      </button>
    </div>
  </div>
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
    <ComponentContainer>
      <div style={{ width: '100%' }}>
        <div id="keyAspectHeading">
          <span style={{ fontFamily: 'Raleway' }} id="keyAspectSpan">
            Key Aspects
          </span>
          <div id="btnStartDiv" onClick={playNext}>
            <Image id="imgSetStart" src={rocket} alt="" />
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
          <span
            style={{ fontFamily: 'Raleway', fontSize: '60px', color: 'white' }}
          >
            Buy Our Token
          </span>

          <div>
            <IoMdArrowRoundBack
              size={70}
              style={{ color: 'white' }}
              onClick={playNext}
            />
            <IoMdArrowRoundForward
              size={70}
              style={{ color: 'white' }}
              onClick={playPrev}
            />
          </div>
        </div>

        <div style={{ marginTop: '100px', width: '100%' }}>
          <AliceCarousel
            ref={carouselRef}
            mouseTracking
            items={items}
            infinite
            controlsStrategy="alternate"
          />
        </div>
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
