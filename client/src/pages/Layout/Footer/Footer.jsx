import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
  background-color: var(--blue-independence);
  color: var(--white-plain);

  a {
    color: var(--white-plain);
  }
`;

class Footer extends Component {
  render() {
    return (
      <Container>
        <div>
          <a
            href='https://github.com/nicklascschmidt/article-mapper'
            target='_blank'
            rel='noopener noreferrer'
          >
            View on Github
          </a>
        </div>
        <div>Built and Designed by Nicklas Chen Schmidt © 2020</div>
      </Container>
    )
  }
}

export default Footer;
