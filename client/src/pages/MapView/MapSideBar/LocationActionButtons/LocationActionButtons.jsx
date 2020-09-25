import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Plus, Trash2, Edit } from '@styled-icons/feather';

import { overwriteActiveAction, clearActiveAction } from '../../../../redux/actions/index';

const Container = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4px;
  padding: 4px;
`;

const StyledButton = styled.button`
  opacity: ${props => props.isInactive && '.4'};
  background-color: ${props => {
    switch (props.name) {
      case 'add':
        return 'var(--color-green-add)';
      case 'edit':
        return 'var(--color-blue-edit)';
      case 'remove':
        return 'var(--color-red-remove)';
      default:
        break;
    }
  }};
`;

const iconStyle = `
  color: var(--color-dark-grey);
  stroke-width: 2px;
`;

const TrashIcon = styled(Trash2)`
  ${iconStyle};
`;

const PlusIcon = styled(Plus)`
  ${iconStyle};
`;

const EditIcon = styled(Edit)`
  ${iconStyle};
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
          title='add'
        >
          <PlusIcon size="1rem" />
        </StyledButton>
        <StyledButton
          type='button'
          name='edit'
          onClick={this.handleClick}
          isInactive={activeAction && activeAction !== 'edit'}
          title='edit'
        >
          <EditIcon size="1rem" />
        </StyledButton>
        <StyledButton
          type='button'
          name='remove'
          onClick={this.handleClick}
          isInactive={activeAction && activeAction !== 'remove'}
          title='remove'
        >
          <TrashIcon size="1rem" />
        </StyledButton>
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