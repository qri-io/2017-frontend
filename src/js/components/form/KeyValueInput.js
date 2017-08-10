import React, { PropTypes } from 'react';

import ValidInput from './ValidInput';
import ValidTextarea from './ValidTextarea';

const KeyValueInput = ({ name, value, onChangeValue, onChangeKey, onRemove }) => {
  const rename = (prevName, _, newName) => {
    onChangeKey(prevName, newName);
  };

  return (
    <div>
      <ValidInput name="field" label="name" value={name} onChange={rename.bind(this, name)} />
      <ValidTextarea name={name} label="value" value={value} onChange={onChangeValue} />
      <a className="red" onClick={onRemove.bind(this, name)}>X</a>
    </div>
  );
};

export default KeyValueInput;
