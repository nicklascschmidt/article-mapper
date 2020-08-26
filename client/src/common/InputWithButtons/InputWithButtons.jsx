import React, { Component } from 'react';
import styled from 'styled-components';

import LabelInputPair from '../LabelInputPair/LabelInputPair.jsx';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  grid-gap: 2px;
`;

const AcceptButton = styled.button`
  background-color: var(--color-green-add);
`;
const DeleteButton = styled.button`
  background-color: var(--color-red-remove);
`;

class InputWithButtons extends Component {
  constructor(props) {
    super(props);
    this.inputEl = null;
  }

  componentDidMount() {
    this.inputEl.focus();
  }

  handleKeyDown = (e) => {
    const { noSubmit, onSubmit, noCancel, onCancel } = this.props;
    switch (e.key) {
      case 'Enter':
        if (!noSubmit) onSubmit(e);
        break;
      case 'Escape':
        if (!noCancel) onCancel(e);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      onCancel,
      onSubmit,
      noCancel = false,
      noSubmit = false,
      // LabelInputPair props
      title, name, value, labelText, onChange, type,
      noColon = false,
      noLabel = false,
    } = this.props;
  
    return (
      <Container title={title}>
        <LabelInputPair
          inputRef={input => { this.inputEl = input }}
          type={type}
          name={name}
          value={value}
          labelText={labelText}
          onChange={onChange}
          noColon={noColon}
          noLabel={noLabel}
          onKeyDown={this.handleKeyDown}
        />
        <ButtonContainer>
          {noSubmit ? null : (
            <AcceptButton title='submit' type='button' onClick={onSubmit}>√</AcceptButton>
          )}
          {noCancel ? null : (
            <DeleteButton title='cancel' type='button' onClick={onCancel}>X</DeleteButton>
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

export default InputWithButtons;
