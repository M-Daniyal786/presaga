import React from 'react'
import rocket from '../../public/rocket.png'
import dollar from '../../public/dollar.png'
import Image from 'next/image'
import { AiOutlineTwitter } from 'react-icons/ai'
import { GrReddit } from 'react-icons/gr'
import { FaTelegramPlane } from 'react-icons/fa'
import { LinkButton } from './shared/Buttons'
import { SiMedium, SiDiscord } from 'react-icons/si'

const CallToAction = () => {
  return (
    <>
      <div id="mainDiv">
        <div id="btnSet">
          <div id="btnLaunchDiv">
            <Image id="imgSet" src={rocket} alt="" />
            <button
              onClick={() => {
                location.href = 'markets'
              }}
              id="btnLaunch"
            >
              Launch App
            </button>
          </div>

          <div id="btnSetUnitDiv">
            <Image id="imgSetUnit" src={dollar} alt="" />
            <button id="btnBuyUnit">Buy UNT</button>
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
