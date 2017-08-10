import React, { PropTypes } from 'react';

// SelectUser is for picking a user key from a set of keys
const SelectUser = ({ users, value, name, label, onChange }) => {
  const handleChange = (e) => {
    onChange(name, e.target.value);
  }

  if (!users) {
    return null;
  }

  return (
    <div className="validFormField form-group">
      {label && <label className="control-label">{label}</label>}
      {label && <br />}
      <select value={value} onChange={handleChange}>
        {users.map((u, i) => {
          return <option key={i} value={u.currentKey}>{u.username}</option>
        })}
      </select>
    </div>
  );
}

export default SelectUser;