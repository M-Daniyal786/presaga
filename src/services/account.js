import conditionalTokensABI from '../abis/conditionalToken.json'
import fpmmABI from '../abis/marketMaker.json'

import { RPC_URL } from '../config/network'
import { condtionalToken } from '../config/network'
let web3
let provider

import { supportedNetworkId, supportedNetworkIdInHex } from '../config/network'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { getERC20Contract } from '../utils/contracts'

/* const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL)) */

if (typeof window !== 'undefined' && window.ethereum) {
  // eslint-disable-next-line global-require

  const Web3 = require('web3')
  web3 = new Web3(window.ethereum)
} else {
  const Web3 = require('web3')
  web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
}

const providerOptions = {
  metamask: {
    id: 'injected',
    name: 'MetaMask',
    type: 'injected',
    check: 'isMetaMask',
  },
  walletconnect: {
    package: WalletConnectProvider, // required

    options: {
      //infuraId: "ad81d172bbf84c088e319d2658dcdf2a",
      //bridge: "https://bridge.walletconnect.org",

      rpc: {
        421611: 'https://rinkeby.arbitrum.io/rpc',
      },
      /*    chainId: 421611,  
      network: "arbitrum-rinkeby",
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      },  */
    },
  },
}

if (typeof window !== 'undefined') {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', () => {
      document.location.reload()
    })

    window.ethereum.on('accountsChanged', function (accounts) {
      document.location.reload()
      localStorage.clear()
    })
  }
}

export const getNetwork = async () => {
  return web3.eth.net.getId().then((res) => {
    if (res !== supportedNetworkId) {
      /*    return window.ethereum.request({
        method: 'wallet_switchEthereumChain',

        params: [{ chainId: supportedNetworkIdInHex }],
      }) */

      window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x66EEB',
              chainName: 'Arbitrum Testnet',
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
              blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
            },
          ],
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      return Promise.resolve(res)
    }
  })
}

export const getAccount = async () => {
  return web3.eth.getAccounts().then((accounts) => {
    return Promise.resolve(accounts[0])
  })
}
export const getAccountBalanceUNT = async (user) => {
  const untToken = getERC20Contract()
  const balance = await untToken.methods.balanceOf(user).call({ from: user })
  return balance
}

export const enableEthereum = async () => {
  if (window.ethereum) {
    const Web3 = require('web3')

    try {
      await window.ethereum.send('eth_requestAccounts')
      /*   const web3Modal = new Web3Modal({
        network: 'arbitrum-rinkeby',

        cacheProvider: false,
        disableInjectedProvider: false,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                421611: 'https://rinkeby.arbitrum.io/rpc',
              },
            },
          },
        },

        theme: 'dark',
      }) */
      //provider = await web3Modal.connect()
      web3 = new Web3(window.ethereum)
    } catch (e) {
      return
    }
  } else {
    const Web3 = require('web3')
    web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
  }

  return Promise.resolve(web3)
}

/* export const getAccBalance = async (yesPositionID, noPositionID) => {
  const ctcontract = new web3.eth.Contract(conditionalTokensABI, CTCONTRACT)

  const currentAccount = await getAccount()

  return ctcontract.methods
    .balanceOfBatch(
      [currentAccount, currentAccount],
      [noPositionID, yesPositionID]
    )
    .call({ from: currentAccount })
}

export const getAccLiquidity = async (mmAddress) => {
  const mmContract = new web3.eth.Contract(fpmmABI, mmAddress)
  const currentAccount = await getAccount()
  return mmContract.methods
    .balanceOf(currentAccount)
    .call({ from: currentAccount })
} */

export const loadAccount = async (showError = false) => {
  try {
    await enableEthereum()
    await getNetwork()
  } catch (err) {
    if (showError) {
      throw Error(err)
    }
  }
}
export const disconnectAccount = async () => {
  alert('Are you sure you want to disconnect your wallet?')
  window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
  window.localStorage.removeItem('user')
  document.location.reload()
}
