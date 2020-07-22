import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import Form from './Form/Form.jsx';

const Container = styled.div``;

class Main extends Component {
  render() {
    return (
      <Container>
        <div>i am main</div>

        <Form />

        <Link to='/new-tab'>
          <div>Go to Tab</div>
        </Link>
      </Container>
    )
  }
}

export default Main;
