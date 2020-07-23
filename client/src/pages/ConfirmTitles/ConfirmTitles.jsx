import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ConfirmTitlesForm from './ConfirmTitlesForm/ConfirmTitlesForm.jsx';

const Container = styled.div``;

class ConfirmTitles extends Component {
  render() {
    return (
      <Container>
        <div>i am confirm titles</div>
        <Link to='/new-tab'>
          <div>Back to Search</div>
        </Link>

        <ConfirmTitlesForm />

      </Container>
    )
  }
}

export default ConfirmTitles;
