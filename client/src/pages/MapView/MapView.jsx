import React, { Component } from 'react';
import styled from 'styled-components';

import ConfirmTitles from './ConfirmTitles/ConfirmTitles.jsx';
import MapContainer from './MapContainer/MapContainer.jsx';

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

class MapView extends Component {
  render() {
    return (
      <Container>
        <ConfirmTitles />
        <MapContainer />
      </Container>
    )
  }
}

export default MapView;
