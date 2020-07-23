import React, { Component } from 'react';
import styled from 'styled-components';

import SearchTitlesForm from './SearchTitlesForm/SearchTitlesForm.jsx';

const Container = styled.div``;

class SearchTitles extends Component {
  render() {
    return (
      <Container>
        <SearchTitlesForm />
      </Container>
    )
  }
}

export default SearchTitles;
