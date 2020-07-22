import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: pink;
`;

class Header extends Component {
  render() {
    return (
      <Container>
        <h1>Article Mapper</h1>
      </Container>
    )
  }
}

export default Header;
