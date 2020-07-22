import React, { Fragment } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  min-width: 20rem;
`;

const LabelInputPair = ({ type = 'text', name, value, displayText, onChange }) => {
  const id = `${name}Input`;
  return (
    <Fragment>
      <label htmlFor={id}>{ displayText }:</label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </Fragment>
  )
}

export default LabelInputPair;
