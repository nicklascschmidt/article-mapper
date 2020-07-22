import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 50vh;
`;

class Bar extends Component {
  render() {
    return (
      <Container>
        i am bar
      </Container>
    )
  }
}

export default Bar;
