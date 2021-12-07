import React from 'react'
import styled from 'styled-components'
import { BodyContainer } from './shared/Containers'
import { ResponsiveImg } from './shared/Images'
import { H4Bold } from './shared/Text'
import { AiOutlineTwitter, AiFillLinkedin } from 'react-icons/ai'
import { SiTelegram, SiDiscord } from 'react-icons/si'

const FooterFixed = () => {
  return (
      <div class="container  " >
        <footer class="d-flex flex-wrap justify-content-between align-items-center ">
        <p class="nav col-md-4 col-12 mb-0 font-weight-bold footerItem justify-content-md-center justify-content-center text-center">
            &copy; 2021 UnityNetwork OÜ. ALL RIGHTS RESERVED.
          </p>
          <ul class="nav col-md-4 col-12 justify-content-md-start justify-content-center">
            <li class="nav-item">
              <a
                href="#"
                class="nav-link px-2 font-weight-bold footerItem clickable"
              >
                Contact
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                class="nav-link px-2 font-weight-bold footerItem clickable"
              >
                Privacy
              </a>
            </li>
            <li class="nav-item">
              <a
                href="#"
                class="nav-link px-2 font-weight-bold footerItem clickable"
              >
                Disclaimer
              </a>
            </li>
          </ul>

          

          <ul class="nav col-md-4 col-12 justify-content-md-end justify-content-center list-unstyled d-flex">
            <li class="ms-3">
              <a class="font-weight-bold footerItem icon" href="#">
                <AiOutlineTwitter />
              </a>
            </li>
            <li class="ms-3">
              <a class="font-weight-bold footerItem icon" href="#">
                <AiFillLinkedin />
              </a>
            </li>
            <li class="ms-3">
              <a class="font-weight-bold footerItem icon" href="#">
                <SiTelegram />
              </a>
            </li>
            <li class="ms-3">
              <a class="font-weight-bold footerItem icon" href="#">
                <SiDiscord />
              </a>
            </li>
          </ul>
        </footer>
      </div>
  )
}

export default FooterFixed
const FooterBackground = styled.div`
  width: 100%;
  bottom: 0;
  margin: 0 auto;
`
