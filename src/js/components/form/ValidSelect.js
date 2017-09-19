import React, { PropTypes } from 'react'

const ValidSelect = ({ label, name, className, options, showError, error, value, helpText, showHelpText, onChange }) => {
  const errorClass = (error && showError) ? 'has-error' : ''
  return (
    <div className={`validFormField form-group ${errorClass} ${className}`}>
      {label && <label className='control-label' htmlFor={name}>{label}</label> }
      <select id={name} name={name} className='form-control' value={value} onChange={(e) => { onChange(name, e.target.value, e) }}>
        <option value='' />
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
      {(helpText && showHelpText) && <i className='help hint'>{helpText}</i>}
    </div>
  )
}

ValidSelect.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // className will set on the containing div
  className: PropTypes.string,
  // array of option strings
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // an error message to displacy
  error: PropTypes.string,
  // value to display in the field
  value: PropTypes.string.isRequired,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
}

ValidSelect.defaultProps = {
  name: undefined,
  showError: true,
  error: undefined,
  helpText: '',
  showHelpText: false
}

export default ValidSelect
