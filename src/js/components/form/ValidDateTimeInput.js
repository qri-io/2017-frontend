import React, { PropTypes } from 'react';
import DateInput from './DateInput';

const ValidDateTimeInput = (props) => {
  const { name, value, label, placeholder, disabled, onChange, error, showError, helpText, showHelpText, className } = props;
  const errorClass = (error && showError) ? "has-error" : "";
  return (
    <div className={`validFormField form-group ${className} ${errorClass}`}>
      {label && <label className="control-label" htmlFor={name}>{label}</label>}
      <DateInput
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {(helpText && showHelpText) && <i className="help hint">{helpText}</i>}
    </div>
  );
};

ValidDateTimeInput.propTypes = {
  // gotta name yo fields
  name: PropTypes.string.isRequired,
  // field value
  value: PropTypes.object,
  // onChange in the form (value, name)
  onChange: PropTypes.func.isRequired,
  // placeholder text
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // enable / disable the field
  disabled: PropTypes.bool,
  // error text, if any
  error: PropTypes.string,
  // explicit control over weather or not to display validation
  showError: PropTypes.bool,
};

ValidDateTimeInput.defaultProps = {
  name: "",
  value: new Date(),
  placeholder: "",
  helpText: "",
  showHelpText: false,
};

export default ValidDateTimeInput;
