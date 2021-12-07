import { Imarket } from '../utils/types'
import conditionalABI from '../abis/conditionalToken.json'
import { factoryAddress } from '../config/network'
import { getMarketMakerContract } from '../utils/contracts'

type conditionT = {
  yes: string
  no: string
}

export const getCollectionIds = async (
  web3: any,

  conditionId: any,
  COLLATERALTOKENCONTRACT: string
): Promise<conditionT> => {
  const conditionalToken = new web3.eth.Contract(
    conditionalABI,
    '0x05d732Aa6a450852c8D1D2982720ee08A78e803b'
  )
  const BYTES32ZERO = '0x0000000000000000000000000000000000000000'

  var position = {} as conditionT
  await conditionalToken.methods
    .getCollectionId(BYTES32ZERO, conditionId, 2)
    .call() // 2 is the index set for Yes wins outcome
    .then(async (collectionId: any) => {
      await conditionalToken.methods
        .getPositionId(COLLATERALTOKENCONTRACT, collectionId)
        .call()
        .then(async (po: string) => {
          position.yes = po

          await conditionalToken.methods
            .getCollectionId(BYTES32ZERO, conditionId, 1)
            .call() // 1 is the index set for No wins outcome
            .then(async (collectionId: string) => {
              await conditionalToken.methods
                .getPositionId(COLLATERALTOKENCONTRACT, collectionId)
                .call()
                .then((po: string) => {
                  position.no = po
                })
            })
        })
    })
  return position
}
