import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route } from "react-router-dom";

import Main from './Main/Main.jsx';

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  min-height: 6vh;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: pink;
`;

class Routes extends Component {
  render() {
    return (
      <Container>
        <Header>
          <h1>Article Mapper</h1>
        </Header>
        <Switch>
          <Route path='/new-tab'>
            <div>this is the new tab you just opened</div>
          </Route>

          {/* This will fallback */}
          <Route path='/'>
            <Main />
          </Route>
        </Switch>
      </Container>
    )
  }
}

export default Routes;
