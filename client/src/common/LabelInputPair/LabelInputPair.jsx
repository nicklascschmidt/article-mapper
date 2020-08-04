import React, { Fragment } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  ${props => props.customStyle};
`;

const LabelInputPair = ({
  type = 'text', name, value, labelText, onChange, customStyle,
  noColon = false, noLabel = false, onKeyDown = () => {}, inputRef,
}) => {
  const id = `${name}Input`;
  return (
    <Fragment>
      {noLabel ? null : (
        <label htmlFor={id}>{`${labelText}${noColon ? '' : ':'}`}</label>
      )}
      <Input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        customStyle={customStyle}
        onKeyDown={onKeyDown}
      />
    </Fragment>
  )
}

export default LabelInputPair;
