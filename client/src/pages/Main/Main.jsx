import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import SearchTitlesForm from './SearchTitlesForm/SearchTitlesForm.jsx';

const Container = styled.div``;

class Main extends Component {
  render() {
    return (
      <Container>
        <div>i am main</div>

        <SearchTitlesForm />

        <Link to='/confirm-titles'>
          <div>Go to Tab</div>
        </Link>
      </Container>
    )
  }
}

export default Main;
