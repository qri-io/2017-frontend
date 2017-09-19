import React, { PropTypes } from 'react'

const UrlInput = ({ label, name, type, showError, error, value, placeholder, onChange, helpText, showHelpText }) => {
  return (
    <div className={(error && showError) ? 'validFormField form-group has-error' : 'validFormField form-group'}>
      {label ? <label className='control-label' htmlFor={name}>{label}</label> : undefined }
      <input
        id={name}
        name={name}
        type={type}
        className='form-control'
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(name, e.target.value, e) }}
      />
      {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
      {(helpText && showHelpText) && <i className='help hint'>{helpText}</i>}
    </div>
  )
}

UrlInput.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // the type of input, default "text"
  type: PropTypes.string.isRequired,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // an error message to displacy
  error: PropTypes.string,
  // value to display in the field
  value: PropTypes.string.isRequired,
  // placeholder text for an empty field. default: ""
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool
}

UrlInput.defaultProps = {
  type: 'text',
  showError: true,
  placeholder: '',
  helpText: '',
  showHelpText: false
}

export default UrlInput
