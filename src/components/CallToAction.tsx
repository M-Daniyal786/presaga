import React from 'react'
import rocket from '../../public/rocket.png'
import dollar from '../../public/dollar.png'
import Image from 'next/image'

const CallToAction = () => {
  return (
    <>
      <div id="mainDiv">
        <div id="btnSet">
          <div id="btnLaunchDiv">
            <Image id="imgSet" src={rocket} alt="" />
            <button id="btnLaunch">Launch App</button>
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
        </div>
      </div>
    </>
  )
}

export default CallToAction
