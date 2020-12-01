import React, { Component } from 'react';
import styled from 'styled-components';

import MapSideBar from './MapSideBar/MapSideBar.jsx';
import MapContainer from './MapContainer/MapContainer.jsx';
import ScrollButton from '../../common/ScrollButton/ScrollButton.jsx';

import { updateFarthestStep } from '../../utils/farthestStep/farthestStep.jsx';

export const scrollButtonContainerId = 'scrollButtonContainer';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    height: min-content;
    .scrollButton {
      z-index: 1000;
      position: fixed;
      bottom: calc(4vh + 1rem);
      right: 1rem;
    }
  }

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100%;
    .scrollButton {
      display: none;
    }
  }
`;

class MapView extends Component {
  componentWillUnmount() {
    updateFarthestStep();
  }

  render() {
    return (
      <Container>
        <MapSideBar />
        <MapContainer />
        <ScrollButton scrollToElementId={scrollButtonContainerId} />
      </Container>
    );
  }
}

export default MapView;
