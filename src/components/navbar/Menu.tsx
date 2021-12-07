import React, { useState, useEffect } from 'react'
import { bool } from 'prop-types'
import styled from 'styled-components'
import { H3 } from '../shared/Text'
import { Button } from '../shared/Buttons'
import { getAccount, loadAccount } from '../../services/account'

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false
  const tabIndex = isHidden ? 0 : -1
  const [account, setAccount] = useState()

  useEffect(() => {
    const intervalId = setInterval(async () => {
      //assign interval to a variable to clear it.
      const user = await getAccount()
      setAccount(user)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [account])

  const connectWallet = async () => {
    loadAccount()
    const hello = await getAccount()
    //setAccount(hello)
    window.localStorage.setItem('user', hello)
    /*   const storage = localStorage.getItem('user') || undefined
    const user = await getAccount()
    if (user) {
      setAccount(user)
    } else {
      loadAccount()
      const hello = await getAccount()
      setAccount(hello)
      window.localStorage.setItem('user', hello)
    } //store */

    /* if (hello) {
      setAccount(hello)
    } else {
      loadAccount()
    } */
  }

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/faucet" tabIndex={tabIndex}>
        <H3>Faucet</H3>
      </a>
      <a
        href="https://bridge.arbitrum.io/"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
      >
        <H3>Arbitrum bridge</H3>
      </a>
      <a
        href="https://unitynetwork.medium.com/presaga-a-summary-of-unity-networks-first-dapp-6012f84693a8"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
      >
        <H3>User guide</H3>
      </a>
      {account ? (
        <Button style={{ padding: '15px' }}>
          {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </Button>
      ) : (
        <Button onClick={() => connectWallet()}>Connect Wallet</Button>
      )}
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: #080c11;
  justify-content: center;
  padding-bottom: 32px;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: 120px;

  display: ${({ open }) => (open ? 'flex' : 'none')};
  text-align: left;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  a {
    padding: 2rem 0;
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: 576px) {
      text-align: center;
    }
    &:hover {
      text-decoration-line: underline;
      text-decoration-color: #d85439;
      text-underline-offset: 7px;
    }
  }
`
