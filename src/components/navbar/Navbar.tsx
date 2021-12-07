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

const Navbar = () => {
  const router = useRouter()
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
      <nav class="navbar navbar-expand-lg sticky-top navbar-dark navbar-inner p-5">
        <div class="container w-100">
          <a class="navbar-brand" href="/">
            <img src="Presaga_logo.png" class="navLogo" alt="PreSaga Logo" />
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
              <button
                type="button"
                class="btn btn-primary btn-lg learn_more"
                href="https://bridge.arbitrum.io/"
                target="_blank"
                onClick={() => getMe()}
              >
                {' '}
                {account && id == supportedNetworkId
                  ? `${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`
                  : 'connect'}
              </button>
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
