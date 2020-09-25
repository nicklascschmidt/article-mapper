import React, { Fragment } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  ${props => props.customStyle};
`;

const LabelInputPair = ({
  type = 'text', name, value, labelComponent, onChange, customStyle,
  noLabel = false, onKeyDown = () => {}, inputRef,
}) => {
  const id = `${name}Input`;
  return (
    <Fragment>
      {noLabel ? null : (
        <label htmlFor={id}>{ labelComponent }</label>
      )}
      <StyledInput
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
