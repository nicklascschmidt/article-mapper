import React from 'react';
import styled from 'styled-components';
import { AlertTriangle } from '@styled-icons/feather';

const Container = styled.div`
  margin: auto;
  width: fit-content;
  padding: 2rem;
`;

const StyledAlertTriangle = styled(AlertTriangle)`
  color: var(--color-secondary);
  stroke-width: 1.5px;
  margin-right: 1rem;
`;

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Container>
          <StyledAlertTriangle size='4rem' />
          <h2>Oops! Something went wrong.</h2>
          <h3>Please reload the page and try again.</h3>
        </Container>
      );
    }

    return this.props.children; 
  }
}
