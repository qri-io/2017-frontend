import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class ValidSelect extends Base {
  template (css) {
    const { label, name, className, options, showError, error, value, helpText, showHelpText, onChange } = this.props
    const errorClass = (error && showError) ? 'has-error' : ''
    return (
      <div className={`validFormField form-group ${errorClass} ${className}`}>
        <select id={name} name={name} className={`form-control ${css('border')}`} value={value} onChange={(e) => { onChange(name, e.target.value, e) }}>
          <option value='' />
          {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>
        {label && <div><label className={css('label')} htmlFor={name}>{label}</label></div>}
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      border: {
        borderColor: palette.gray,
        ':focus': {
          borderColor: palette.a
        }
      },
      label: {
        color: palette.gray
      }
    }
  }
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
  // value to display in the field
  value: PropTypes.string,
  // short message to help the user
  helpText: PropTypes.string,
  // weather to show help text or not
  showHelpText: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  palette: Palette
}

ValidSelect.defaultProps = {
  name: undefined,
  showError: true,
  error: undefined,
  helpText: '',
  showHelpText: false,
  palette: defaultPalette
}
