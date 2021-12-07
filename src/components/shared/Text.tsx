import styled from 'styled-components'

export const H2_NoScale = styled.div`
  font-weight: bold;
  color: ${(props) => props.color || '#FFFFFF'};
  font-size: ${(props) => props.fontSize || '45px'};
`

export const H2 = styled(H2_NoScale)`
  @media (max-width: 768px) {
    font-size: calc(${(props) => props.fontSize || '45px'} * 0.5);
  }
`

export const H3_NoScale = styled.div`
  color: ${(props) => props.color || '#FFFFFF'};
  font-size: ${(props) => props.fontSize || '25px'};
`

export const H3 = styled(H3_NoScale)`
  @media (max-width: 768px) {
    font-size: calc(${(props) => props.fontSize || '32px'} * 0.5);
  }
`

export const H4_NoScale = styled.div`
  color: ${(props) => props.color || '#FFFFFF'};
  font-size: ${(props) => props.fontSize || '22px'};
`

export const H4Bold_NoScale = styled(H4_NoScale)`
  font-weight: bold;
  font-size: ${(props) => props.fontSize || '18px'};
`

export const H4 = styled(H4_NoScale)`
  @media (max-width: 768px) {
    font-size: calc(${(props) => props.fontSize || '22px'} * 0.5);
  }
`

export const H4Bold = styled(H4)`
  font-weight: bold;
  }
`
