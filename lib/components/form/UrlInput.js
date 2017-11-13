import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class UrlInput extends Base {
  template (css) {
    const { label, name, type, showError, error, value, placeholder, onChange, helpText, showHelpText, disabled } = this.props
    return (
      <div className={(error && showError) ? 'validFormField form-group has-error' : 'validFormField form-group'}>
        {label ? <label className='control-label' htmlFor={name}>{label}</label> : undefined }
        <input
          id={name}
          name={name}
          type={type}
          className='form-control'
          value={value}
          placeholder={placeholder || name}
          onChange={(e) => { onChange(name, e.target.value, e) }}
          disabled={!!disabled}
        />
        <div className={css('error')}>{error}</div>
        {(helpText && showHelpText) && <i className='help_hint'>{helpText}</i>}
      </div>
    )
  }
  styles () {
    const { palette } = this.props
    return {
      error: {
        height: '20px',
        margin: '10px',
        color: palette.error,
        fontWeight: '300'
      }
    }
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
  palette: Palette
}

UrlInput.defaultProps = {
  type: 'text',
  showError: true,
  placeholder: '',
  helpText: '',
  showHelpText: false,
  disabled: '',
  palette: defaultPalette
}
