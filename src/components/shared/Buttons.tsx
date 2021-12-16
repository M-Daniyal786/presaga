import styled from 'styled-components'

export const Button = styled.button`
  /*border: none;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 40px;

  background: #d85439;
  box-shadow: 0px 2px 20px rgba(216, 84, 57, 0.7);
  border-radius: 25px;

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;*/
  border: none;
  margin-bottom: 1%;
  text-decoration: none;
  color: #d85439; /*#ffffff*/
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover {
    background-color: #FFFAFA;
    color: #d85439;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0);
  }
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 50px;

  background: 	#000080; /*#d85439*/
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.7);
  border-radius: 15px;

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;
  float: right;
  display:inline-block;
`

export const ToggleButton = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  text-align: right;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 40px;

  background: #d85439;
  box-shadow: 0px 2px 20px rgba(216, 84, 57, 0.7);

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;
`

export const OutlineButton = styled.button`
  border: none;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 40px;

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;

  background: transparent;
  border: 2px solid #d85439;
  box-sizing: border-box;
  filter: drop-shadow(0px 2px 20px rgba(216, 84, 57, 0.7));
  border-radius: 25px;

  &:hover {
    background-color: #d85439;
  }
`

export const LinkButton = styled.a`
  border: none;
  margin: 0;
  text-decoration: none;
  color: white;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 15px 40px;

  font-family: Nunito;
  font-weight: bold;
  font-size: 18px;

  background: transparent;
  border: 2px solid #d85439;
  box-sizing: border-box;
  filter: drop-shadow(0px 2px 20px rgba(216, 84, 57, 0.7));
  border-radius: 25px;

  &:hover {
    background-color: #d85439;
    color: white;
  }
`
