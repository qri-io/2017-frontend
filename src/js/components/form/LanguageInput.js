import React, { PropTypes } from 'react';

const LanguageInput = (props) => {
  const { label, name, showError, error, value, onChange, helpText, showHelpText } = props;
  return (
    <div className={(error && showError) ? "validFormField form-group has-error" : "validFormField form-group"}>
      {label && <label className="control-label" htmlFor={name}>{label}</label>}
      <select id={name} name={name} className="form-control" value={value} onChange={(e) => { onChange(name, e.target.value, e); }}>
        <option value="">-unknown-</option>
        <option value="arabic">arabic</option>
        <option value="bengali">bengali</option>
        <option value="chinese">chinese</option>
        <option value="english">english</option>
        <option value="french">french</option>
        <option value="german">german</option>
        <option value="hindi">hindi</option>
        <option value="japanese">japanese</option>
        <option value="javanese">javanese</option>
        <option value="korean">korean</option>
        <option value="lahanda">lahanda</option>
        <option value="portuguese">portuguese</option>
        <option value="russian">russian</option>
        <option value="spanish">spanish</option>
      </select>
      {(error != "" && showError) ? <div className="control-label">{error}</div> : undefined}
      {(helpText && showHelpText) && <i className="help hint">{helpText}</i>}
    </div>
  );
};

LanguageInput.propTypes = {
  // required name for the field
  name: PropTypes.string.isRequired,
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // value to display in the field
  value: PropTypes.string.isRequired,
  // an error message to displacy
  error: PropTypes.string,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
};

LanguageInput.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  placeholder: "",
  helpText: "",
  showHelpText: false,
};

export default LanguageInput;
