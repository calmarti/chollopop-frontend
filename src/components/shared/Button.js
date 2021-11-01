import styled from "styled-components";

const strongColor = '#059DC0'

const Button = styled.button`
  background-color: ${props => props.variant ==='primary' ? strongColor : 'white'};
  color: ${props => props.variant === 'primary' ? 'white': strongColor};
  font-size: 20px;
  font-weight: bold;
  padding: 10px 30px;
  border-radius: 20px;
  margin: 10px 0px;
  cursor: pointer;
  text-decoration: none;
  opacity: ${props => props.disabled ? 0.5 : 1}

`;

export default Button;
