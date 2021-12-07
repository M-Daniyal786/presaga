import React from 'react'
import styled from 'styled-components'
import { BodyContainer } from './shared/Containers'
import { ResponsiveImg } from './shared/Images'
import { LinkButton } from './shared/Buttons'
import { AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai'
import { SiTelegram, SiMedium, SiDiscord } from 'react-icons/si'

const CallToAction = () => {
  return (
    <>
      <Background>
        {/* <Elipse /> */}

        <BodyContainer>
          <CallToActionContainer>
            <Button
              onClick={() => {
                location.href = 'markets'
              }}
            >
              Launch dApp
            </Button>

            <Texta>
              <ResponsiveImg
                maxWidth="400px"
                maxWidthSM="300px"
                src="White_Red_logo_transparent_croped.png"
                alt="PreSaga_logo"
                className="PreSagaLogo"
                style={{}}
              />

              <Subtitle>
                PreSaga allows users to capitalise on their understanding of
                global events
              </Subtitle>

              <ButtonSmallScreen
                onClick={() => {
                  location.href = 'markets'
                }}
              >
                Launch App
              </ButtonSmallScreen>

              <ul class="nav col-md-4 justify-content-start list-unstyled d-flex">
                <li class="ms-3">
                  <a class="font-weight-bold footerItem icon" href="#">
                    <SiMedium />
                  </a>
                </li>
                <li class="ms-3">
                  <a class="font-weight-bold footerItem icon" href="#">
                    <SiTelegram />
                  </a>
                </li>

                <li class="ms-3">
                  <a class="font-weight-bold footerItem icon" href="#">
                    <AiOutlineTwitter />
                  </a>
                </li>
                <li class="ms-3">
                  <a class="font-weight-bold footerItem icon" href="#">
                    <SiDiscord />
                  </a>
                </li>
              </ul>
            </Texta>
          </CallToActionContainer>
        </BodyContainer>
      </Background>
    </>
  )
}

export default CallToAction

const Background = styled.div`
  background: url(moon.png) fixed;
  background-size: cover;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
`

const CallToActionContainer = styled.div`
  height: 100%;
  margin: 0;
  padding-top: 10px;
  padding-bottom: 83px;
`

export const Texta = styled.div`
  position: absolute;
  bottom: 8%;
  @media (max-width: 365px) {
    bottom: 30%;
  }
`
export const Header = styled.div`
  line-height: 60px;
  color: #ffffff;
  font-size: 42px;

  @media (max-width: 768px) {
    padding-left: 2%;
    font-size: 30px;
    line-height: 45px;
  }
`
const Subtitle = styled.div`
  line-height: 30px;
  color: antiquewhite; /*dddddd;*/
  max-width: 570px;
  margin-top: 2%;
  margin-bottom: 50px;
  font-size: 20px;

  @media (max-width: 768px) {
    padding-left: 2%;
    font-size: 18px;
    line-height: 35px;
  }
`
const Elipse = styled.div`
  position: absolute;
  margin: auto;
  right: 0;

  border-bottom-left-radius: 373px;
  border-top-left-radius: 373px;
  height: 373px;
  width: 186px;
  background: linear-gradient(152.22deg, #d85439 9.36%, #293847 70.26%);
  @media (max-width: 570px) {
    display: none;
  }
`
export const Button = styled.button`
  border: none;
  margin-bottom: 5%;
  text-decoration: none;
  color: #fffafa; /*#ffffff*/
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    background-color: #fffafa;
    color: #d85439;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0);
  }
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 50px;

  background: #d85439; /*#d85439*/
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.7);
  border-radius: 15px;

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;
  float: right;
  display: inline-block;
  @media (max-width: 768px) {
    display: none;
  }
`

const ButtonSmallScreen = styled.div`
  border: none;
  margin-bottom: 5%;
  text-decoration: none;
  color: #fffafa; /*#ffffff*/
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    background-color: #fffafa;
    color: #d85439;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0);
  }
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 50px;

  background: #d85439; /*#d85439*/
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  margin-left: 2%;
  font-family: Nunito;
  font-weight: bold;
  font-size: 16px;

  display: inline-block;
  @media (min-width: 768px) {
    display: none;
  }
`

const Contact = styled.div`
  color: #fff;

  margin-top: 10px;
  @media (max-width: 768px) {
  }
`
