import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../Button/Button.jsx';

const StyledLink = styled(Link)`
  display: block;
  width: min-content;
  padding: .5rem;
`;

const StyledButton = styled(Button)`
  white-space: nowrap;
`;

const NewSearchButton = () => {
  return (
    <StyledLink to='/search'>
      <StyledButton>New Search</StyledButton>
    </StyledLink>
  );
}

export default NewSearchButton;
