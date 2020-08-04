import React, { Component } from 'react';
import styled from 'styled-components';

import LabelInputPair from '../LabelInputPair/LabelInputPair.jsx';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AcceptButton = styled.button`
  background-color: green;
`;
const DeleteButton = styled.button`
  background-color: red;
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
      title, name, value, labelText, onChange, customStyle, type,
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
        <div>
          {noSubmit ? null : (
            <AcceptButton type='button' onClick={onSubmit}>√</AcceptButton>
          )}
          {noCancel ? null : (
            <DeleteButton type='button' onClick={onCancel}>X</DeleteButton>
          )}
        </div>
      </Container>
    );
  }
}

export default InputWithButtons;
