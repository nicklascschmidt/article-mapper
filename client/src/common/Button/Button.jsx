import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 4px;
  background-color: var(--color-accent);
  color: var(--color-white);
  padding: 4px 8px;

  &:hover {
    opacity: .9;
    box-shadow: 0px 2px 6px rgba(0,0,0,0.2);
  }

  ${props => props.customStyle};
`;

const Button = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      { children }
    </StyledButton>
  );
}

export default Button;
