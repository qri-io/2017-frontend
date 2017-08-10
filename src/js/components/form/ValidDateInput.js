import React, { PropTypes } from 'react';
import DateInput from './DateInput';

const ValidDateInput = (props) => {
  const { name, label, valid, value, placeholder, disabled, onChange, helpText, showHelpText, className, showValidation } = props;
  let validClass = "", message;

  if (showValidation) {
    message = (valid) ? "" : message;
    validClass = (valid) ? "valid " : "invalid ";
  }

  return (
    <div className={`${validClass} ${className}`}>
      {label && <label className="control-label" htmlFor={name}>{label}</label>}
      <DateInput disabled={disabled} name={name} placeholder={placeholder} value={value} onChange={onChange} />
      <span className="message">{message}</span>
      {(helpText && showHelpText) && <i className="help hint">{helpText}</i>}
    </div>
  );
};

ValidDateInput.propTypes = {
  // gotta name yo fields
  name: PropTypes.string.isRequired,
  // field value
  value: PropTypes.object,
  // onChange in the form (value, name)
  onChange: PropTypes.func,
  // placeholder text
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // leave undefined to display no valid
  valid: PropTypes.bool,
  // enable / disable the field
  disabled: PropTypes.bool,
  // className will set on the containing div
  className: PropTypes.string,
  // explicit control over weather or not to display validation
  showValidation: PropTypes.bool,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
};

ValidDateInput.defaultProps = {
  name: "",
  value: new Date(),
  placeholder: "",
  className: " validTextArea field",
  showValidationIcon: false,
  helpText: "",
  showHelpText: false,
};

export default ValidDateInput;
