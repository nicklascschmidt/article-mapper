import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LocationsDisplay from './LocationsDisplay/LocationsDisplay.jsx';

const Container = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
`;

const BackButton = styled.button`
  margin: .5rem;
`;

class MapSideBar extends Component {
  render() {
    return (
      <Container>
        <Link to='/confirm'>
          <BackButton>{`<-- Back to Confirm`}</BackButton>
        </Link>

        <LocationsDisplay />
      </Container>
    )
  }
}

export default MapSideBar;
