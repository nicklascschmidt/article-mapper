import React, { Component } from 'react';
import styled from 'styled-components';

import ConfirmTitlesForm from './ConfirmTitlesForm/ConfirmTitlesForm.jsx';
import BackButton from '../../common/BackButton/BackButton.jsx';

const Container = styled.div``;

class ConfirmTitles extends Component {
  render() {
    return (
      <Container>
        <BackButton toPath='/search' titleText='Back to Search Page' />

        <ConfirmTitlesForm />
      </Container>
    )
  }
}

export default ConfirmTitles;
