import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.div``;

class ConfirmTitles extends Component {
  render() {
    return (
      <Container>
        <div>i am confirm titles</div>
        <Link to='/new-tab'>
          <div>Back to Search</div>
        </Link>

        <div>ConfirmTitlesForm goes here</div>

      </Container>
    )
  }
}

export default ConfirmTitles;
