import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div``;

class MapView extends Component {
  render() {
    return (
      <Container>
        <div>map view</div>

        <Link to='/confirm-titles'>
          <div>Back to Search</div>
        </Link>
      </Container>
    )
  }
}

export default MapView;
