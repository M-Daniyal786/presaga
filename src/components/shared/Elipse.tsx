import styled from 'styled-components'
import PropTypes from 'prop-types';

const Elipse = (props) => {
  return (
    <ElipseStyled className={props.className} width={props.width} height={props.height}>
      <ElipseIconStyled width={props.iconWidth} height={props.iconHeight} src={props.iconSrc} alt="UN_icon" />
    </ElipseStyled>
  )
}

export default Elipse

Elipse.propTypes = {
  className: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  iconWidth: PropTypes.string.isRequired,
  iconHeight: PropTypes.string.isRequired
};

const ElipseStyled = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: #d85439;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #d85439 0%, #492119 100%);

  @media (max-width: 768px) {
    width: calc(${(props) => props.width} * 0.5);
    height: calc(${(props) => props.height} * 0.5);
  }
`

const ElipseIconStyled = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  @media (max-width: 768px) {
    width: calc(${(props) => props.width} * 0.5);
    height: calc(${(props) => props.height} * 0.5);
  }
`
