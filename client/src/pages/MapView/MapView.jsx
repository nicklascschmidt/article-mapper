import React, { Component } from 'react';
import styled from 'styled-components';

import MapSideBar from './MapSideBar/MapSideBar.jsx';
import MapContainer from './MapContainer/MapContainer.jsx';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

class MapView extends Component {
  render() {
    return (
      <Container>
        <MapSideBar />
        <MapContainer />
      </Container>
    );
  }
}

export default MapView;
