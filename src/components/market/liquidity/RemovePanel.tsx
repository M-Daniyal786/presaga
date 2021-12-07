import React, { useState } from 'react'
import styled from 'styled-components'
import { H4Bold_NoScale, H4_NoScale } from '../../shared/Text'

import { Input } from '../../shared/Inputs'

import { removeFunding } from '../../../services/liquidity'
import { Button } from '../../shared/Buttons'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { getAccount, getAccountBalanceUNT } from '../../../services/account'
import { RPC_URL, networkExplorer } from '../../../config/network'
import { widthDrawFees } from '../../../services/trade'
const RemovePanel = (props) => {
  const market = props.data
  const [amount, setAmount] = useState()

  const transactionSuccessStatus = (hash) => (
    <div>
      Success!{' '}
      <a target="_blank" href={networkExplorer + hash}>
        View Transaction Here
      </a>
    </div>
  )

  const transactionFailureStatus = (hash) => (
    <div>
      Transaction failed!{' '}
      <a target="_blank" href={networkExplorer + hash}>
        View Transaction Here
      </a>
    </div>
  )
  const handleRemoveLiquidity = () => {
    removeFunding(amount, market.address)
      .then((receipt) => {
        if (receipt.status === true) {
          toast.success(transactionSuccessStatus(receipt.transactionHash))
        } else {
          toast.error(transactionFailureStatus(receipt.transactionHash))
        }
      })

      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <PanelContainer>
      <TextContainer>
        <FlexText>
          <BoldStyled
            fontSize="20px"
            color="#D85439"
            style={{ marginBottom: '30px' }}
          >
            <H4_NoScale fontSize="18px">Your Liquidity</H4_NoScale>
            <BoldStyled fontSize="18px" color="#D85439">
              {market.accountLiquidity} UNT
            </BoldStyled>
            {market.resolved ? (
              <>
                <InputStyled
                  placeholder="UNT"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <SubmitContainer>
                  <Button onClick={() => handleRemoveLiquidity()}>
                    Remove Liquidity
                  </Button>
                </SubmitContainer>
              </>
            ) : (
              <p>
                Removing liquidity will be available once market is resolved :)
              </p>
            )}
          </BoldStyled>
        </FlexText>
      </TextContainer>
    </PanelContainer>
  )
}

export default RemovePanel

const PanelContainer = styled.div``

const FlexText = styled.div`
  flex: 50%;
  @media (max-width: 768px) {
    flex: 100%;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    row-gap: 25px;
  }
`

const HowMuchStyled = styled(H4_NoScale)`
  padding-top: 45px;
`

const BoldStyled = styled(H4Bold_NoScale)`
  padding-top: 6px;
`

const InputStyled = styled(Input)`
  margin-top: 15px;
  width: 100%;
`
const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
