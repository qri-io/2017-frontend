import React from 'react'
import PropTypes from 'prop-types'
import Base from '../Base'
import { defaultPalette } from '../../propTypes/palette'

export default class ValidTextarea extends Base {
  template (css) {
    const { label, name, type, value, showError, error, helpText, showHelpText, onChange, className, labelTop, small } = this.props
    const labelPosition = labelTop ? 'form-control-top' : 'form-control-bottom'
    const inputPosition = labelTop ? 'form-control-bottom' : 'form-control-top'
    const wrap = small ? 'form-control-wrap-md' : 'form-control-wrap-lg'
    const area = small ? css('small') : ''
    return (
      <div className={(error && showError) ? `validFormField form-group has-error ${className}` : `validFormField form-group ${className}`}>
        <div className={wrap}>
          <textarea
            id={name}
            name={name}
            type={type}
            className={`form-control ${css('textarea')} ${inputPosition} ${area}`}
            value={value}
            onChange={(e) => { onChange(name, e.target.value, e) }}
          />
          {label && <div className={`input-label ${labelPosition}`} ><label htmlFor={name}>{label}</label></div>}
        </div>
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
  styles () {
    const palette = defaultPalette
    return {
      textarea: {
        border: `1px solid ${palette.primaryMuted}`,
        borderRadius: '3px',
        padding: '10px',
        ':focus': {
          border: `1px solid ${palette.primaryLight}`
        }
      },
      label: {
        color: palette.primaryLight
      },
      small: {
        height: 120
      }
    }
  }
}

ValidTextarea.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // the type of input, default "text"
  type: PropTypes.string.isRequired,
  // value to display in the field
  value: PropTypes.string,
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
  onChange: PropTypes.func.isRequired,
  // show label on top
  labelTop: PropTypes.bool
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
