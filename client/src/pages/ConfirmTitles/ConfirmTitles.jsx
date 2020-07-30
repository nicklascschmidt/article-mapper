import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ConfirmTitlesForm from './ConfirmTitlesForm/ConfirmTitlesForm.jsx';

const Container = styled.div``;

const BackButton = styled.button`
  margin: .5rem;
`;

class ConfirmTitles extends Component {
  render() {
    return (
      <Container>
        <Link to='/search'>
          <BackButton>{`<-- Back to Search`}</BackButton>
        </Link>

        <ConfirmTitlesForm />
      </Container>
    )
  }
}

export default ConfirmTitles;
