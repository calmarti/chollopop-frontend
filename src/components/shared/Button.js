import styled from "styled-components";

const strongColor = '#059DC0'

const Button = styled.button`
  background-color: ${props => props.variant ==='primary' ? strongColor: 'blue'};
  color: ${props => props.variant === 'primary' ? 'white': strongColor};
  font-size: 20px;
  font-weight: bold;
  padding: 10px 60px;
  border-radius: 10px;
  margin: 10px 0px;
  cursor: pointer;
  text-decoration: none;
`;

export default Button;
