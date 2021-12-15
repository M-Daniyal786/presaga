import React, { useState } from 'react'
import rocket from '../../public/rocket.png'
import rocket30x30 from '../../public/Group30x30.png'
import dollar from '../../public/dollar.png'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AiOutlineTwitter } from 'react-icons/ai'
import { GrReddit } from 'react-icons/gr'
import { FaTelegramPlane } from 'react-icons/fa'
import { LinkButton } from './shared/Buttons'
import { SiMedium, SiDiscord } from 'react-icons/si'

const CallToAction = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

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

          <div id="btnSetUnitDiv">
            {/* <Image id="imgSetUnit" src={dollar} alt="" /> */}
            <button id="btnBuyUnit">Buy</button>
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
    </>
  )
}

export default CallToAction
