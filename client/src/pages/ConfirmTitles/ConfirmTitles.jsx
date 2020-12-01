import React, { Component } from 'react';
import styled from 'styled-components';

import Card from '../../common/Card/Card.jsx';
import ConfirmTitlesForm from './ConfirmTitlesForm/ConfirmTitlesForm.jsx';
import BackButton from '../../common/BackButton/BackButton.jsx';

import { updateFarthestStep } from '../../utils/farthestStep/farthestStep.jsx';

const Container = styled.div`
  padding-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ConfirmTitles extends Component {
  componentWillUnmount() {
    updateFarthestStep();
  }

  render() {
    return (
      <Container>
        <BackButton toPath='/search' titleText='Back to Search Page' />

        <FormContainer>
          <Card
            headerText='Confirm Locations'
            descriptionText='Double check all below items are locations. Feel free to edit, remove, or add items as needed.'
          >
            <ConfirmTitlesForm />
          </Card>
        </FormContainer>
      </Container>
    )
  }
}

export default ConfirmTitles;
