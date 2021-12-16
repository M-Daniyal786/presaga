import styled from 'styled-components'

export const BodyContainer = styled.div`
  // margin: auto;
  // max-width: 1440px;
   /* padding-left: 10%;
   padding-right: 10%; */
   display:"flex";
   justify-content: center;
   align-items: center;
   width: 90%;
   padding-top: 2%;


  @media (max-width: 768px) {
    padding-left: 8%;
    padding-right: 3%;
  }
`

export const ComponentContainer = styled.div`
  margin-left:10%;
  /* margin-right: 10%; */
  height:"100%";
  padding-top: 50px;  
  @media (max-width: 768px) {
    padding-top: 50px;
    margin-left: 5%;
    margin-right: 5%;
    height:70vh;
  }
`
