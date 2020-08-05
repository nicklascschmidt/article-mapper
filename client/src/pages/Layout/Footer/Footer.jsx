import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
  background-color: var(--color-primary);
  color: var(--color-white);

  a {
    color: var(--color-white);
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
        <div>
          {`Built and Designed by `}
          <a
            href='http://www.nicklaschenschmidt.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Nicklas Chen Schmidt
          </a>
          {` © 2020`}
        </div>
      </Container>
    )
  }
}

export default Footer;
