import React, { Component } from 'react';
import styled from 'styled-components';

import MapSideBar from './MapSideBar/MapSideBar.jsx';
import MapContainer from './MapContainer/MapContainer.jsx';
import ScrollButton from '../../common/ScrollButton/ScrollButton.jsx';

export const scrollButtonContainerId = 'scrollButtonContainer';

const Container = styled.div`
  height: min-content;

  @media only screen and (max-width: 768px) {
    .scrollButton {
      z-index: 1000;
      position: fixed;
      bottom: calc(4vh + 1rem);
      right: 1rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .scrollButton {
      display: none;
    }
    display: grid;
    grid-template-columns: 300px 1fr;
  }
`;

class MapView extends Component {
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
