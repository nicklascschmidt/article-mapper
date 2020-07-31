import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { overwriteActiveAction, clearActiveAction } from '../../../../redux/actions/index';

const Container = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledButton = styled.button`
  background-color: ${props => {
    if (props.isInactive) return 'grey';
    switch (props.name) {
      case 'add':
        return 'lightgreen';
      case 'edit':
        return 'lightblue';
      case 'remove':
        return 'red';
      default:
        break;
    }
  }};
`;

class LocationActionButtons extends Component {
  componentWillUnmount() {
    const { clearActiveAction } = this.props;
    clearActiveAction();
  }

  handleClick = (e) => {
    const { activeAction, clearActiveAction, overwriteActiveAction } = this.props;
    const { name } = e.target;
    if (activeAction === name) {
      clearActiveAction();
    } else {
      overwriteActiveAction(name);
    }
  }

  /** binding - only fires when focused (i.e. action button is selected) */
  handleKeyDown = (e) => {
    console.log('handleKeyDown, e.key: ', e.key);
    const { clearActiveAction } = this.props;
    if (e.key === 'Escape') clearActiveAction();
  }
  
  render() {
    const { activeAction } = this.props;
    return (
      <Container onKeyDown={this.handleKeyDown}>
        <StyledButton
          type='button'
          name='add'
          onClick={this.handleClick}
          isInactive={activeAction && activeAction !== 'add'}
        >+</StyledButton>
        <StyledButton
          type='button'
          name='edit'
          onClick={this.handleClick}
          isInactive={activeAction && activeAction !== 'edit'}
        >∆</StyledButton>
        <StyledButton
          type='button'
          name='remove'
          onClick={this.handleClick}
          isInactive={activeAction && activeAction !== 'remove'}
        >X</StyledButton>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  activeAction: state.interactions.activeAction,
});

const mapDispatchToProps = {
  overwriteActiveAction,
  clearActiveAction,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationActionButtons));