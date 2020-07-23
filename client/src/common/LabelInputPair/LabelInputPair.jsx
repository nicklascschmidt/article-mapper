import React, { Fragment } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  min-width: 20rem;
  ${props => props.customStyle};
`;

const LabelInputPair = ({
  type = 'text', name, value, displayText, onChange, customStyle,
  noColon = false, noLabel = false,
}) => {
  const id = `${name}Input`;
  return (
    <Fragment>
      {noLabel ? null : (
        <label htmlFor={id}>{`${displayText}${noColon ? '' : ':'}`}</label>
      )}
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        customStyle={customStyle}
      />
    </Fragment>
  )
}

export default LabelInputPair;
