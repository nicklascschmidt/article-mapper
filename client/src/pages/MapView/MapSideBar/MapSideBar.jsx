import React, { Component } from 'react';
import styled from 'styled-components';

import LocationsDisplay from './LocationsDisplay/LocationsDisplay.jsx';
import LocationActionButtons from './LocationActionButtons/LocationActionButtons.jsx';
import BackButton from '../../../common/BackButton/BackButton.jsx';


/**
 * Only direct children get box-shadow
 */
const Container = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  background-color: var(--color-white);
  box-shadow: inset -6px 0 8px -6px rgba(0,0,0,0.4);
`;

class MapSideBar extends Component {
  render() {
    return (
      <Container>
        <BackButton toPath='/confirm' titleText='Back to Confirm Page' />

        <LocationsDisplay />

        <LocationActionButtons />
      </Container>
    )
  }
}

export default MapSideBar;
