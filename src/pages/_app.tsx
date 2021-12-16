import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../components/footer.css'
import '../components/WaysToEarn.css'
import '../components/KeyAspects.css'
import '../components/navbar/Navbar.css'
import './markets.css'
import '../components/ActiveMarkets.css'
import '../components/market.css'
import '../components/court.css'
import '../components/CallToAction.css'
import '../components/styles.css'
import "../pages/404.css"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #1A1C1F;
    font-family: Nunito;
    font-style: normal;
    font-weight: normal;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
        rel="stylesheet"
      />

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

if (typeof window !== 'undefined') {
  require('jquery')
  require('bootstrap/dist/js/bootstrap')
}
