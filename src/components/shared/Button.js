import styled from "styled-components";

const strongColor = "#627e9a";

const Button = styled.button`
  background-color: ${(props) =>
  props.variant === "primary" ? strongColor : "white"};
  color: ${(props) => (props.variant === "primary" ? "white" : strongColor)};
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 1.75rem;
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  cursor: pointer;
  text-decoration: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default Button;
