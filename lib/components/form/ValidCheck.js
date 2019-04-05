import React from 'react'
import PropTypes from 'prop-types'

export default class ValidCheck extends React.PureComponent {
  render () {
    const { label, name, className, checked, showError, error, helpText, showHelpText, onChange, labelTop } = this.props
    const errorClass = (error && showError) ? 'has-error' : ''
    const labelPosition = labelTop ? 'form-control-top' : 'form-control-bottom'
    const inputPosition = labelTop ? 'form-control-bottom' : 'form-control-top'
    return (
      <div className={`validFormField form-group ${errorClass} ${className}`}>
        <div className='form-control-wrap-sm'>
          <input id={name} type='checkbox' name={name} className={`form-control ${inputPosition}`} checked={checked} onChange={(e) => { onChange(name, e.target.value, e) }} />
          {label && <div className={`input-label ${labelPosition}`} ><label htmlFor={name}>{label}</label></div>}
        </div>
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
}

ValidCheck.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // className will set on the containing div
  className: PropTypes.string,
  // whether the input starts checked
  checked: PropTypes.bool,
  showError: PropTypes.bool,
  // value to display in the field
  value: PropTypes.string,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  // show label on top
  labelTop: PropTypes.bool,
  // should a "none" option be allowed?
  allowEmpty: PropTypes.bool
}

ValidCheck.defaultProps = {
  name: undefined,
  showError: true,
  error: undefined,
  helpText: '',
  showHelpText: false,
  allowEmpty: true
}
