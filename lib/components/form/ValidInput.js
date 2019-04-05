import React from 'react'
import PropTypes from 'prop-types'

export default class ValidInput extends React.PureComponent {
  render () {
    const { label, labelTop, name, type, value, showError, error, helpText, showHelpText, onChange, className, inline, width, isDatasetRef } = this.props
    const margin = 'valid-input-margin'
    const labelPosition = labelTop ? 'form-control-top' : 'form-control-bottom'
    const inputPosition = labelTop ? 'form-control-bottom' : 'form-control-top'
    return (
      <div className={`${margin} validFormField form-group ${error && showError && 'has-error'} ${className} ${inline ? 'valid-input-inline' : ''} `} style={width ? { width } : {}}>
        <div className='form-control-wrap-sm'>
          {isDatasetRef && <span style={{ 'position': 'relative', 'top': '0px' }}>me /&nbsp;</span>}
          <input
            style={{ 'display': 'inline-block' }}
            id={name}
            name={name}
            type={type}
            className={`form-control ${inputPosition}`}
            value={value || ''}
            onChange={(e) => { onChange(name, e.target.value, e) }}
          />
          {label && <div className={`input-label ${labelPosition}`}><label htmlFor={name}>{label}</label></div>}
        </div>
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
}

ValidInput.propTypes = {
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
  // whether or not to actually display any passed-in errors
  showError: PropTypes.bool,
  // an error message to display
  error: PropTypes.string,
  // short message to help the user
  helpText: PropTypes.string,
  // whether to show help text or not
  showHelpText: PropTypes.bool,
  // change handler func. will be called with (name, value, event)
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  // show label on top
  labelTop: PropTypes.bool,
  // an integer that gives a specific width to the input
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // if the input is for naming a datasetRef
  isDatasetRef: PropTypes.bool
}

ValidInput.defaultProps = {
  name: undefined,
  type: 'text',
  placeholder: '',
  showError: true,
  error: undefined,
  helpText: '',
  showHelpText: false,
  className: '',
  isDatasetRef: false
}
