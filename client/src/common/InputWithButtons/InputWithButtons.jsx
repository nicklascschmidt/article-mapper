import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckCircle, XCircle } from '@styled-icons/feather';

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

const ConfirmButton = styled.button`
  background-color: var(--color-green-add);
  padding: 4px;
`;
const CancelButton = styled.button`
  background-color: var(--color-red-remove);
  padding: 4px;
`;

const iconStyle = `
  color: var(--color-dark-grey);
  stroke-width: 2px;
`;

const CheckCircleIcon = styled(CheckCircle)`
  ${iconStyle};
`;

const XCircleIcon = styled(XCircle)`
  ${iconStyle};
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
      noLabel = false,
    } = this.props;
  
    return (
      <Container title={title}>
        <LabelInputPair
          inputRef={input => { this.inputEl = input }}
          type={type}
          name={name}
          value={value}
          labelComponent={labelText}
          onChange={onChange}
          noLabel={noLabel}
          onKeyDown={this.handleKeyDown}
        />
        <ButtonContainer>
          {noSubmit ? null : (
            <ConfirmButton title='confirm' type='button' onClick={onSubmit}>
              <CheckCircleIcon size="1rem" />
            </ConfirmButton>
          )}
          {noCancel ? null : (
            <CancelButton title='cancel' type='button' onClick={onCancel}>
              <XCircleIcon size="1rem" />
            </CancelButton>
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

export default InputWithButtons;
