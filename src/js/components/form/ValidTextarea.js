import React, { PropTypes } from 'react'

const ValidTextarea = ({ label, name, type, value, placeholder, showError, error, helpText, showHelpText, onChange }) => {
  return (
    <div className={(error && showError) ? 'validFormField form-group has-error' : 'validFormField form-group'}>
      {label && <label className='control-label' htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        type={type}
        className='form-control'
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(name, e.target.value, e) }}
      />
      {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined }
      {(helpText && showHelpText) && <i className='help hint'>{helpText}</i>}
    </div>
  )
}

ValidTextarea.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // the type of input, default "text"
  type: PropTypes.string.isRequired,
  // value to display in the field
  value: PropTypes.string.isRequired,
  // placeholder text for an empty field. default: ""
  placeholder: PropTypes.string,
  // weather or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // an error message to display
  error: PropTypes.string,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired
}

ValidTextarea.defaultProps = {
  name: undefined,
  type: 'text',
  placeholder: '',
  showError: true,
  error: undefined,
  helpText: '',
  showHelpText: false
}

export default ValidTextarea
