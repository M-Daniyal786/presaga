import React,{useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  pt: 2
};

function AnimatedModal(props) {
  const { handleClose,visible,title,children } = props;

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={visible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <Box sx={style}>
            <CustomDiv>
            <CustomH2>
              {title}
            </CustomH2>
            <div style={{marginTop:20}}>
              {children}
            </div>
            </CustomDiv>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AnimatedModal

const CustomDiv = styled.div`
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  text-align:center;
  @media (max-width: 768px){
    
  }
`
const CustomH2 = styled.h2`
font-size:25px;
  @media (max-width: 768px){
    font-size:10px;
    
  }
`