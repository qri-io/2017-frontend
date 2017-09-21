import React, { PropTypes } from 'react'
import DateInput from './DateInput'

const ValidDateInput = ({ name, label, valid, value, placeholder, disabled, helpText, showHelpText, className, showValidation, onChange }) => {
  let validClass = ''
  let message

  if (showValidation) {
    message = (valid) ? '' : message
    validClass = (valid) ? 'valid ' : 'invalid '
  }

  return (
    <div className={`${validClass} ${className}`}>
      {label && <label className='control-label' htmlFor={name}>{label}</label>}
      <DateInput disabled={disabled} name={name} placeholder={placeholder} value={value} onChange={onChange} />
      <span className='message'>{message}</span>
      {(helpText && showHelpText) && <i className='help hint'>{helpText}</i>}
    </div>
  )
}

ValidDateInput.propTypes = {
  // gotta name yo fields
  name: PropTypes.string.isRequired,
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // leave undefined to display no valid
  valid: PropTypes.bool,
  // field value
  value: PropTypes.instanceOf(Date),
  // placeholder text
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // enable / disable the field
  disabled: PropTypes.bool,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool
  // className will set on the containing div
  className: PropTypes.string,
  // explicit control over weather or not to display validation
  showValidation: PropTypes.bool,
  // onChange in the form (value, name)
  onChange: PropTypes.func.isRequired
}

ValidDateInput.defaultProps = {
  name: '',
  value: new Date(),
  placeholder: '',
  helpText: '',
  showHelpText: false,
  className: ' validTextArea field',
  showValidationIcon: false
}

export default ValidDateInput
