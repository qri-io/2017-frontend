import React from 'react'
import PropTypes from 'prop-types'

import DateInput from './DateInput'

export default class ValidDateTimeInput extends React.PureComponent {
  render () {
    const { name, value, label, placeholder, disabled, error, showError, helpText, showHelpText, className, onChange, labelTop } = this.props
    const errorClass = (error && showError) ? 'has-error' : ''
    const labelPosition = labelTop ? 'form-control-top' : 'form-control-bottom'
    const inputPosition = labelTop ? 'form-control-bottom' : 'form-control-top'
    return (
      <div className={`validFormField form-group ${className} ${errorClass}`}>
        <div className='form-control-wrap-md'>
          <DateInput
            className={inputPosition}
            name={name}
            disabled={disabled}
            placeholder={placeholder || name}
            value={value}
            onChange={onChange}
          />
          {label && <div className={`input-label ${labelPosition}`}><label htmlFor={name}>{label}</label></div>}
        </div>
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
}

ValidDateTimeInput.propTypes = {
  // gotta name yo fields
  name: PropTypes.string.isRequired,
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // field value
  value: PropTypes.instanceOf(Date),
  // placeholder text
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // enable / disable the field
  disabled: PropTypes.bool,
  // error text, if any
  error: PropTypes.string,
  // explicit control over weather or not to display validation
  showError: PropTypes.bool,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
  // className will set on the containing div
  className: PropTypes.string,
  // onChange in the form (value, name)
  onChange: PropTypes.func.isRequired,
  // show label on top
  labelTop: PropTypes.bool
}

ValidDateTimeInput.defaultProps = {
  name: '',
  value: new Date(),
  placeholder: '',
  helpText: '',
  showHelpText: false
}
