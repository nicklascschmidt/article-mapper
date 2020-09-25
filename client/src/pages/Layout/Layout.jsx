import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import Routes from '../Routes/Routes.jsx';

const Container = styled.div`
  height: 100vh;

  header {
    height: 6vh;
  }
  main {
    height: 90vh;
    overflow: scroll;
  }
  footer {
    height: 4vh;
  }
`;

class Layout extends Component {
  render() {
    return (
      <Container>
        <Header />
        <main id='scrollButtonContainer'>
          <Routes />
        </main>
        <Footer />
      </Container>
    )
  }
}

export default Layout;
