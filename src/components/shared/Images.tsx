import styled from "styled-components";

export const ResponsiveImg = styled.img`
width: 100%;
height: auto;

max-height: ${props => props.maxHeight || "100%"};
max-width: ${props => props.maxWidth || "100%"};

@media (max-width: 768px){
    max-height: ${props => props.maxHeightSM || "100%"};
    max-width: ${props => props.maxWidthSM || "100%"};
}
`

