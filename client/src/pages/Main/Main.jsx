import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import Form from './Form/Form.jsx';
import Bar from './Bar/Bar.jsx';

const Container = styled.div`
  min-height: 50vh;
`;

class Main extends Component {
  render() {
    return (
      <Container>
        <div>this is the Main app</div>

        <Form />

        <Link to='/new-tab'>
          <div>Go to Tab</div>
        </Link>
        <Bar />
      </Container>
    )
  }
}

export default Main;
