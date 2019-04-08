import React from 'react'
import PropTypes from 'prop-types'

export default class UrlInput extends React.PureComponent {
  render () {
    const { label, name, type, showError, error, value, placeholder, onChange, helpText, showHelpText, disabled, className, labelTop } = this.props
    const labelPosition = labelTop ? 'form-control-top' : 'form-control-bottom'
    const inputPosition = labelTop ? 'form-control-bottom' : 'form-control-top'
    return (
      <div className={(error && showError) ? `validFormField form-group has-error ${className}` : `validFormField form-group ${className}`}>
        <div className='form-control-wrap-sm'>
          <input
            id={name}
            name={name}
            type={type}
            className={`form-control ${inputPosition}`}
            value={value}
            placeholder={placeholder || name}
            onChange={(e) => { onChange(name, e.target.value, e) }}
            disabled={!!disabled}
          />
          {label && <div className={`input-label ${labelPosition}`}><label htmlFor={name}>{label}</label></div>}
        </div>
        {error && <div className='url-input-error'>{error}</div>}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
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
  value: PropTypes.string,
  // placeholder text for an empty field. default: ""
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  // show label on top (default is to show label below input)
  labelTop: PropTypes.bool
}

UrlInput.defaultProps = {
  type: 'text',
  showError: true,
  placeholder: '',
  helpText: '',
  showHelpText: false,
  disabled: ''
}
