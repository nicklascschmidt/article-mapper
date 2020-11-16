import React from 'react';
import styled from 'styled-components';
import { Loader } from '@styled-icons/feather';

const Container = styled.div`
  justify-content: center;
  display: flex;
  padding: 2rem;
`;

const StyledLoader = styled(Loader)`
  animation: spin infinite 2s ease-in-out;
  color: var(--color-secondary);
  stroke-width: 1.5px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default (
  <Container>
    <StyledLoader size='4rem' />
  </Container>
);
