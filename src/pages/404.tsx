import Footer from '../components/Footer'
import styled from 'styled-components'
import Navbar from '../components/navbar/Navbar'
export default function FourOhFour() {
  return (
    <Container>
      <Navbar />
      <FaucetContainer>
        <Image404 id="fnfImg" src="404.png"  />
      </FaucetContainer>
      <Footer />
    </Container>
  )
}
const Container = styled.div`
  background-image: url('dark-background-lunar.jpeg');
  background-position: center center;
  background-size: cover;
  height: 100%;
`
const FaucetContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: stretch;
  flex-direction: column;
  height: 70vh;
  /* margin-left: 50px; */
  width: 100%;
`

const Image404 = styled.img`
  height:100%;
  width:100%;
  @media (max-width: 425px){
    height:50%;
    width:50%;
  }
  @media (min-width: 426px and max-width: 768px){
    height:100%;
    width:100%;
  }
`