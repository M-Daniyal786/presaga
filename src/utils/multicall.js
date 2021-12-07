import { ethers } from 'ethers'
import { networkIds, supportedNetworkURLs } from 'src/config/networks'
import { getMulticallContract } from 'src/config/networks'
import { MultiCallResponse } from './type-utils'
import MultiCallABI from 'src/abis/multicall'

export const multicallv2 = async (
  abi,
  calls,
  provider,
  MulticallOptions = { requireSuccess: false }
) => {
  const { requireSuccess } = options
  const multi = getMulticallContract(MultiCallABI, provider)
  const itf = new ethers.utils.Interface(abi)

  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ])
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}
export default multicallv2
