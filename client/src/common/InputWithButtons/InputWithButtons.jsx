import React from 'react';
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

const InputWithButtons = (props) => {
  const {
    onCancel,
    onSubmit,
    noCancel = false,
    noSubmit = false,
    // LabelInputPair props
    title, name, value, labelText, onChange, customStyle, type,
    noColon = false,
    noLabel = false,
  } = props;

  const handleKeyDown = (e) => {
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

  return (
    <Container title={title}>
      <LabelInputPair
        type={type}
        name={name}
        value={value}
        labelText={labelText}
        onChange={onChange}
        noColon={noColon}
        noLabel={noLabel}
        onKeyDown={handleKeyDown}
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

export default InputWithButtons;
