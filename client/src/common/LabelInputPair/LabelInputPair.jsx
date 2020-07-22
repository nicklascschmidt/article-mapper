import React, { Fragment } from 'react';

const LabelInputPair = ({ type = 'text', name, value, displayText, onChange }) => {
  const id = `${name}Input`;
  return (
    <Fragment>
      <label htmlFor={id}>{ displayText }:</label>
      <input
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
