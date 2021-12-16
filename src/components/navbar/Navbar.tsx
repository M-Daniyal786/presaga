import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Burger from './Burger'
import Menu from './Menu'
import { Button } from '../shared/Buttons'
import { BodyContainer } from '../shared/Containers'
import { ResponsiveImg } from '../shared/Images'
import { Dropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'
import {
  getAccount,
  loadAccount,
  disconnectAccount,
} from '../../services/account'
import Web3 from 'web3'
import { supportedNetworkId } from '../../config/network'
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}

const Navbar = (props: any) => {

  const router = useRouter()
  const toggleRef = useRef()


  const [open, setOpen] = useState(false)
  const [account, setAccount] = useState('')
  const node = useRef()
  const [id, setId] = useState(0)
  const menuId = 'main-menu'
  const connectB = async () => {
    loadAccount()
    const hello = await getAccount()
    setAccount(hello)
  }

  const getMe = async () => {
    loadAccount()
    const hello = await getAccount()
    setAccount(hello)
    window.localStorage.setItem('user', hello)
  }
  useEffect(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)

      await window.web3.eth.net.getId().then((res) => {
        getMe()

        setId(res.toString())
      })
    }

    var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    // console.log("ss", document.getElementsByClassName("navbar"))
    document.getElementsByClassName("navbar")[0].style.top = "0";
    document.getElementsByClassName("navbar")[0].style.transition = "0.5s ease-in";
  } else {
    // console.log("aa", document.getElementsByClassName("navbar"))
    document.getElementsByClassName("navbar")[0].style.top = "-150px";
    document.getElementsByClassName("navbar")[0].style.transition = "0.5s ease-out";
  }
  prevScrollpos = currentScrollPos;
}

    const intervalId = setInterval(async () => {
      const user = await getAccount()
      setAccount(user)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [account])

  const disconnectWallet = () => {
    disconnectAccount()
  }

  useOnClickOutside(node, () => setOpen(false))
  
  
  return (
    <>
      <nav class="navbar navbar-expand-xl sticky-top navbar-dark navbar-inner pt-5 pb-5">
        <div class="container w-100">
          <a class="navbar-brand" href="/">
            {props?.folder ? (<img src={`/Presaga_logo.png`} class="navLogo" alt="PreSaga Logo" />) : (<img src="Presaga_logo.png" class="navLogo" alt="PreSaga Logo" />)}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse nav-menu-item"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav">
              <li class="nav-item text-center">
                <a class="nav-link active" aria-current="page" href="/faucet">
                  Faucet
                </a>
              </li>
              <li class="nav-item text-center">
                <a class="nav-link active" aria-current="page" href="/court">
                  Market Disputes
                </a>
              </li>
              <li class="nav-item text-center">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="https://bridge.arbitrum.io/"
                >
                  Arbitrum Bridge
                </a>
              </li>
              <li class="nav-item text-center">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="https://unitynetwork.medium.com/presaga-a-summary-of-unity-networks-first-dapp-6012f84693a8"
                >
                  User Guide
                </a>
              </li>
            </ul>
            <form class="d-flex justify-content-center">
              
              

              
              {account && id == supportedNetworkId
                ? (
                <div class="dropdown">
                  <button
                    type="button"
                      class="btn btn-primary btn-lg learn_more dropdown-toggle"
                      data-toggle="dropdown"
                    // href="https://bridge.arbitrum.io/"
                    // target="_blank"
                      onClick={()=>{toggleRef.current.style.display == "block" ? toggleRef.current.style.display = "none" :  toggleRef.current.style.display ="block" }}
                      
                    >
                       
                    <svg xmlns="http://www.w3.org/2000/svg" width="20.933" height="20.902" viewBox="0 0 20.933 20.902" style={{marginRight:10 }}>
                      <g id="Group_313" data-name="Group 313" transform="translate(0 0)">
                        <path id="Path_2259" data-name="Path 2259" d="M-1530.588,1139.311c-.047.26-.085.522-.143.779a5.537,5.537,0,0,1-1.459,2.694q-1.641,1.683-3.289,3.359c-.032.033-.068.061-.147.131.024-.178.041-.306.058-.434a7.306,7.306,0,0,0-.246-3.211.422.422,0,0,1,.117-.476c.5-.5,1-1.008,1.483-1.523a2.616,2.616,0,0,0,.651-2.771,2.584,2.584,0,0,0-2.15-1.836,2.494,2.494,0,0,0-2.271.713c-1.254,1.261-2.488,2.541-3.72,3.823a2.624,2.624,0,0,0-.823,1.959,2.725,2.725,0,0,0,1.294,2.283c.275.183.291.236.11.52a9.878,9.878,0,0,1-1.4,1.674.279.279,0,0,1-.414.03,5.505,5.505,0,0,1-2.368-4.133,5.589,5.589,0,0,1,1.712-4.666c1.144-1.149,2.242-2.346,3.416-3.463a5.39,5.39,0,0,1,5.725-1.3,5.425,5.425,0,0,1,3.788,4.462c.027.146.05.293.075.44Z" transform="translate(1551.521 -1133.142)" fill="#e73b22"/>
                        <path id="Path_2260" data-name="Path 2260" d="M-1653.673,1261.865c-.019.585-.054,1.155-.051,1.725a6.469,6.469,0,0,0,.3,1.869.411.411,0,0,1-.11.46c-.527.532-1.057,1.063-1.566,1.613a2.713,2.713,0,0,0,.709,4.238,2.658,2.658,0,0,0,3.094-.391c1.294-1.287,2.555-2.607,3.814-3.929a2.57,2.57,0,0,0,.748-1.512,2.666,2.666,0,0,0-1.256-2.634c-.3-.2-.313-.245-.146-.558a5.524,5.524,0,0,1,1.4-1.656.327.327,0,0,1,.446-.006,5.545,5.545,0,0,1,2.334,3.784,5.46,5.46,0,0,1-.647,3.627,5.617,5.617,0,0,1-.783,1.041c-1.035,1.093-2.087,2.169-3.145,3.24a9.334,9.334,0,0,1-1.2,1.1,5.612,5.612,0,0,1-8.818-3.706,5.5,5.5,0,0,1,1.479-4.838c1.081-1.152,2.207-2.263,3.313-3.392C-1653.73,1261.912-1653.7,1261.888-1653.673,1261.865Z" transform="translate(1658.632 -1254.017)" fill="#e73b22"/>
                      </g>
                      </svg>
                      
    
                  {account.substring(0, 6)}...{account.substring(
                    account.length - 4
                      )}
                       

                    </button>
                    <div class="dropdown-menu dropdown-styles" style={{ width: "100%"}} ref={toggleRef}>
                          <a class="dropdown-item" href="#">Disconnect</a>
                        </div> 
                    </div>)
                  : (<button
                  type="button"
                  class="btn btn-primary btn-lg learn_more"
                  href="https://bridge.arbitrum.io/"
                  target="_blank"
                  onClick={() => getMe()}
              
  
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.933" height="20.902" viewBox="0 0 20.933 20.902" style={{marginRight:10 }}>
                    <g id="Group_313" data-name="Group 313" transform="translate(0 0)">
                      <path id="Path_2259" data-name="Path 2259" d="M-1530.588,1139.311c-.047.26-.085.522-.143.779a5.537,5.537,0,0,1-1.459,2.694q-1.641,1.683-3.289,3.359c-.032.033-.068.061-.147.131.024-.178.041-.306.058-.434a7.306,7.306,0,0,0-.246-3.211.422.422,0,0,1,.117-.476c.5-.5,1-1.008,1.483-1.523a2.616,2.616,0,0,0,.651-2.771,2.584,2.584,0,0,0-2.15-1.836,2.494,2.494,0,0,0-2.271.713c-1.254,1.261-2.488,2.541-3.72,3.823a2.624,2.624,0,0,0-.823,1.959,2.725,2.725,0,0,0,1.294,2.283c.275.183.291.236.11.52a9.878,9.878,0,0,1-1.4,1.674.279.279,0,0,1-.414.03,5.505,5.505,0,0,1-2.368-4.133,5.589,5.589,0,0,1,1.712-4.666c1.144-1.149,2.242-2.346,3.416-3.463a5.39,5.39,0,0,1,5.725-1.3,5.425,5.425,0,0,1,3.788,4.462c.027.146.05.293.075.44Z" transform="translate(1551.521 -1133.142)" fill="#e73b22"/>
                      <path id="Path_2260" data-name="Path 2260" d="M-1653.673,1261.865c-.019.585-.054,1.155-.051,1.725a6.469,6.469,0,0,0,.3,1.869.411.411,0,0,1-.11.46c-.527.532-1.057,1.063-1.566,1.613a2.713,2.713,0,0,0,.709,4.238,2.658,2.658,0,0,0,3.094-.391c1.294-1.287,2.555-2.607,3.814-3.929a2.57,2.57,0,0,0,.748-1.512,2.666,2.666,0,0,0-1.256-2.634c-.3-.2-.313-.245-.146-.558a5.524,5.524,0,0,1,1.4-1.656.327.327,0,0,1,.446-.006,5.545,5.545,0,0,1,2.334,3.784,5.46,5.46,0,0,1-.647,3.627,5.617,5.617,0,0,1-.783,1.041c-1.035,1.093-2.087,2.169-3.145,3.24a9.334,9.334,0,0,1-1.2,1.1,5.612,5.612,0,0,1-8.818-3.706,5.5,5.5,0,0,1,1.479-4.838c1.081-1.152,2.207-2.263,3.313-3.392C-1653.73,1261.912-1653.7,1261.888-1653.673,1261.865Z" transform="translate(1658.632 -1254.017)" fill="#e73b22"/>
                    </g>
                  </svg>
  
                 Connect
                
                </button>)}
          
            </form>
          </div>
        </div>
      </nav>

      {/*<BodyContainer>
        <NavContainer>
          <a href="/">
            <ResponsiveImg
              maxHeight="65px"
              maxWidth="269px"
              src="header_logo.png"
              alt="UN_logo"
            />
          </a>
          <HeaderMenu>
            <Link href="/faucet">Faucet</Link>
            <Link href="/court">Market Disputes</Link>
            <Link
              href="https://bridge.arbitrum.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arbitrum bridge
            </Link>

            <Link
              href="https://unitynetwork.medium.com/presaga-a-summary-of-unity-networks-first-dapp-6012f84693a8"
              target="_blank"
              rel="noopener noreferrer"
            >
              User guide
            </Link>
            {account ? (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{
                    color: '#ffffff',
                    cursor: 'pointer',

                    transition:
                      'background 250ms ease-in-out, transform 150ms ease',
                    borderColor: 'rgba(216, 84, 57, 0.7)',

                    alignItems: 'flex-start',
                    padding: '15px 40px',

                    background: '#d85439',
                    boxShadow: '0px 2px 20px rgba(216, 84, 57, 0.7)',
                    borderRadius: '25px',

                    fontFamily: ' Nunito',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  {account === null
                    ? '-'
                    : account
                    ? `${account.substring(0, 6)}...${account.substring(
                        account.length - 4
                      )}`
                    : 'connect'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => disconnectWallet()}>
                    Hello Saga Squad
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button onClick={async () => await getMe()}>Connect</Button>
            )}
            {/*  <Button onClick={() => getMe()}>
              {account === null
                ? '-'
                : account
                ? `${account.substring(0, 6)}...${account.substring(
                    account.length - 4
                  )}`
                : 'connect'}
            </Button> }
          </HeaderMenu>
          <HamburgerMenu>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </HamburgerMenu>
        </NavContainer>
      </BodyContainer>*/}
    </>
  )
}

export default Navbar

const NavBackground = styled.div`
  background-color: #080c11;
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 35px;
  padding-bottom: 35px;
`

const DropDownDiv = styled.div`
  
`

const HeaderMenu = styled.div`
  display: flex;
  align-items: center;

  flex: 1;
  justify-content: flex-end;
  @media (max-width: 1200px) {
    display: none;
  }
`
const HamburgerMenu = styled.div`
  align-items: center;
  display: flex;
  padding-left: 50px;

  @media (min-width: 1200px) {
    display: none;
  }
`

const Link = styled.a`
  padding: 15px 25px;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    text-decoration-line: underline;
    text-decoration-color: #d85439;
    text-underline-offset: 7px;
  }
`
