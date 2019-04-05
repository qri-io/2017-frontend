import React from 'react'
import PropTypes from 'prop-types'

export default class ValidPeriodicityInput extends React.PureComponent {
  render () {
    const { label, labelTop, name, className, value, showError, error, helpText, showHelpText, onChange } = this.props
    const errorClass = (error && showError) ? 'has-error' : ''
    const labelPosition = labelTop ? 'form-control-top' : 'form-control-bottom'
    const inputPosition = labelTop ? 'form-control-bottom' : 'form-control-top'
    return (
      <div className={`validFormField ${errorClass} ${className}`}>
        <div className='form-control-wrap-sm'>
          <select id={name} name={name} className={`form-control ${inputPosition}`} value={value} onChange={(e) => { onChange(name, e.target.value, e) }}>
            <option value=''>Never</option>
            <option value='R/P1D'>Daily</option>
            <option value='R/P1W'>Weekly</option>
            <option value='R/P1M'>Monthly</option>
            <option value='R/P1Y'>Annually</option>
            <option value='R/PT1S'>Continuously</option>
            <option value='R/PT1H'>Hourly</option>
            <option value='R/P0.33W'>Three times a week</option>
            <option value='R/P3.5D'>Semiweekly</option>
            <option value='R/P0.33M'>Three times a Month</option>
            <option value='R/P2W'>Biweekly</option>
            <option value='R/P0.5M'>SemiMonthly</option>
            <option value='R/P2M'>Bimonthly</option>
            <option value='R/P3M'>Quarterly</option>
            <option value='R/P4M'>Three Times a year</option>
            <option value='R/P6M'>Semiannually</option>
            <option value='R/P2Y'>Biennially</option>
            <option value='R/P3Y'>Triennially</option>
          </select>
          {label && <div className={`input-label ${labelPosition}`} ><label htmlFor={name}>{label}</label></div>}
        </div>
        {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
        {(helpText && showHelpText) && <div><i className='help_hint'>{helpText}</i></div>}
      </div>
    )
  }
}

ValidPeriodicityInput.propTypes = {
  // if provided it'll create a label element to accompany the field
  label: PropTypes.string,
  // required name for the field
  name: PropTypes.string.isRequired,
  // className will set on the containing div
  className: PropTypes.string,
  // value to display in the field
  value: PropTypes.string,
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

ValidPeriodicityInput.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  // https://project-open-data.cio.gov/open-licenses/
  value: '',
  helpText: '',
  showHelpText: false
}
