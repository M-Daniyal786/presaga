import styled from 'styled-components'

export const BodyContainer = styled.div`
  // margin: auto;
  // max-width: 1440px;
   padding-left: 10%;
   padding-right: 10%;
   padding-top: 2%;

  height= 100%;

  @media (max-width: 768px) {
    padding-left: 5%;
    padding-right: 5%;
  }
`

export const ComponentContainer = styled.div`
  margin-left:10%;
  margin-right: 10%;
  padding-top: 50px;
  height= 100%;
  @media (max-width: 768px) {
    padding-top: 50px;
    margin-left: 5%;
    margin-right: 5%;
  }
`
