import Footer from '../components/Footer'
import Navbar from '../components/navbar/Navbar'
import styled from 'styled-components'
export default function FourOhFour() {
  return (
    <Container>
      <Navbar />
      <FaucetContainer>
        <img id="fnfImg" src="404.png" />
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