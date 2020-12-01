import React, { Component } from 'react';
import styled from 'styled-components';

import Card from '../../common/Card/Card.jsx';
import SearchTitlesForm from './SearchTitlesForm/SearchTitlesForm.jsx';
import { updateFarthestStep } from '../../utils/farthestStep/farthestStep.jsx';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class SearchTitles extends Component {
  componentWillUnmount() {
    updateFarthestStep();
  }

  render() {
    return (
      <Container>
        <Card
          headerText='New Search'
          descriptionText="Enter the article's URL and info below. Hover over each help icon for an example of what to input."
        >
          <SearchTitlesForm />
        </Card>
      </Container>
    )
  }
}

export default SearchTitles;
