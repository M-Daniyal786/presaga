let web3
import { RPC_URL } from '../config/network'
const Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
export const formatBigNumber = (val) => {
  return web3.utils.fromWei(val)
}
