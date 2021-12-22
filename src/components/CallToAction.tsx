import React, { useState } from 'react'
import rocket from '../../public/rocket.png'
import rocket30x30 from '../../public/Group30x30.png'
import dollar from '../../public/dollar.png'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AiOutlineTwitter } from 'react-icons/ai'
import { GrReddit } from 'react-icons/gr'
import { FaTelegramPlane } from 'react-icons/fa'
import { Button, ButtonNonHover, LinkButton } from './shared/Buttons'
import { SiMedium, SiDiscord } from 'react-icons/si'
import AnimatedModal from "./Modal/AnimatedModal"
import signal from "../../public/undraw_signal.svg"
import styled from 'styled-components'

const CallToAction = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true)
  }
  const handleClose = () => {
    setVisible(false)
  }

  return (
    <>
      <div id="mainDiv">
        {/* <img src="hero.png"/> */}
        <div id="btnSet">
          <div id="btnLaunchDiv" onClick={() => {
                location.href = 'markets'
              }}>
            {/* <Image id="imgSet" src={rocket30x30} alt="" /> */}
            <button
              
              id="btnLaunch"
            >
              Launch App
            </button>
          </div>

          <div id="btnSetUnitDiv" onClick={handleOpen} style={{cursor:"pointer"}}>
            {/* <Image id="imgSetUnit" src={dollar} alt="" /> */}
            <div id="btnBuyUnit">Buy</div>
          </div>
        </div>

        <div id="headingMain">
          <span id="headingSpan">
            PreSaga allows users to capitalize on their understanding of global
            events
          </span>

          <ul id="iconsUl">
            <li>
              <a className="font-weight-bold footerItem icon" href="#">
                <GrReddit />
              </a>
            </li>
            <li className="ms-3">
              <a className="font-weight-bold footerItem icon" href="#">
                <FaTelegramPlane />
              </a>
            </li>

            <li className="ms-3">
              <a className="font-weight-bold footerItem icon" href="#">
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="ms-3">
              <a className="font-weight-bold footerItem icon" href="#">
                <SiDiscord />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <AnimatedModal visible={visible} handleClose={handleClose} title={"You are on the wrong network, please switch to the Arbitrum Testnet to continue."}><Image src={signal} height={300}/> <SubmitContainerNew>
        <ButtonNonHover onClick={() => console.log("running")} >
          Switch Network
        </ButtonNonHover>

       
      </SubmitContainerNew> </AnimatedModal>
    </>
  )
}

export default CallToAction


const SubmitContainerNew = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`