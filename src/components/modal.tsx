import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Input } from '../components/shared/Inputs'
import { H3_NoScale, H4Bold_NoScale } from '../components/shared/Text'

const YES_SHARE = 'Yes'
const NO_SHARE = 'No'
const BUY = 'Buy'
const SELL = 'Sell'
const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [selectedTab, setSelectedTab] = useState(BUY)
  const [selectedShare, setSelectedShare] = useState(YES_SHARE)
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCloseClick = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a
            style={{ color: 'red', padding: '5px' }}
            href="#"
            onClick={handleCloseClick}
          >
            X
          </a>
        </StyledModalHeader>
        {/*       {title && <StyledModalTitle>{title}</StyledModalTitle>} */}
        <StyledModalBody>
          <Shares>
            <Share
              selected={selectedShare == YES_SHARE}
              selectedColor="#1CC27C"
              onClick={() => setSelectedShare(YES_SHARE)}
            >
              <H4Bold_NoScale fontSize="18px">{YES_SHARE}</H4Bold_NoScale>
            </Share>
            <Share
              selected={selectedShare == NO_SHARE}
              selectedColor="#ed362a"
              onClick={() => setSelectedShare(NO_SHARE)}
            >
              <H4Bold_NoScale fontSize="18px">{NO_SHARE}</H4Bold_NoScale>
            </Share>
          </Shares>
          <InputStyled
            placeholder="UNT"
            type="number"
            style={{
              display: 'flex',
              marginTop: '50px',

              width: '100%',
            }}
          />
          <div
            style={{
              display: 'flex',
              paddingTop: '30px',
              gap: '10px',
              width: '100%',
            }}
          >
            <Button>Stake</Button>
            <Button>UnStake</Button>
          </div>
          {/*    
            <Shares>
              <Share
                selected={selectedShare == YES_SHARE}
                selectedColor="#1CC27C"
                onClick={() => setSelectedShare(YES_SHARE)}
              >
                <H4Bold_NoScale fontSize="18px">{YES_SHARE}</H4Bold_NoScale>
              </Share>
              <Share
                selected={selectedShare == NO_SHARE}
                selectedColor="#ed362a"
                onClick={() => setSelectedShare(NO_SHARE)}
              >
                <H4Bold_NoScale fontSize="18px">{NO_SHARE}</H4Bold_NoScale>
              </Share>
            </Shares>
            {/*  <InputStyled
            placeholder="UNT"
            type="number"
            /*  onChange={(e) => changeValue(e.target.value)} */
          /* value={amount} 
            /> 

            <SubmitContainer>
              <Button
               onClick={() => handleBuy()}
              disabled={amount ? false : true}
              >
                Buy
              </Button>
            </SubmitContainer>
          </> */}
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  } else {
    return null
  }
}

const StyledModalBody = styled.div`
  padding-top: 10px;

  background: linear-gradient(180deg, #293847 0%, rgba(41, 56, 71, 0) 100%);
`

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`

const StyledModal = styled.div`
  background: white;
  background: #293847;
  width: 500px;
  height: 400px;
  border-radius: 15px;
  padding: 15px;
`
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

export default Modal

const Shares = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 50px;
  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 15px;
  }
`
const Share = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  min-height: 55px;
  background: ${(props) => (props.selected ? props.selectedColor : '#344351')};
  padding: 0 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: ${(props) => (!props.selected ? props.selectedColor : '')};
    opacity: ${(props) => (!props.selected ? '.3' : '')};
  }
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 70px;
  @media (max-width: 768px) {
    padding-top: 33px;
  }
`
const InputStyled = styled(Input)`
  margin-top: 15px;
`
export const Button = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  text-align: flex-end;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 40px;
  width: 100%;

  background: #d85439;
  box-shadow: 0px 2px 20px rgba(216, 84, 57, 0.7);
  border-radius: 10px;

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;
`
