import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeftCircle } from '@styled-icons/feather';


const StyledLink = styled(Link)`
  display: block;
  width: min-content;
  padding: .5rem;
`;

const StyledArrowLeftCircle = styled(ArrowLeftCircle)`
  color: var(--color-accent);
  stroke-width: 1.5px;
`;

const BackButton = ({ toPath, titleText = false }) => {
  return (
    <StyledLink to={toPath}>
      <StyledArrowLeftCircle size="2rem" title={titleText} />
    </StyledLink>
  );
}

export default BackButton;
