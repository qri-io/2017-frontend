import React from 'react'
import PropTypes from 'prop-types'

const ValidLicenseInput = ({ label, name, className, value, showError, error, helpText, showHelpText, onChange }) => {
  const errorClass = (error && showError) ? 'has-error' : ''
  return (
    <div className={`validFormField ${errorClass} ${className}`}>
      {label && <label className='control-label' htmlFor={name}>{label}</label>}
      <select id={name} name={name} className='form-control' value={value} onChange={(e) => { onChange(name, e.target.value, e) }}>
        <option value='http://www.usa.gov/publicdomain/label/1.0/'>Public Domain</option>
        <option value='https://creativecommons.org/publicdomain/zero/1.0/'>CC0 - Creative Commons Zero Public Domain Dedication</option>
        <option value='http://opendatacommons.org/licenses/pddl/1.0/'>PDDL - Open Data Commons Public Domain Dedication and Licence</option>
        <option value='http://opendatacommons.org/licenses/by/1.0/'>ODC-By - Open Data Commons Attribution License</option>
        <option value='http://opendatacommons.org/licenses/odbl/1.0/'>ODbL - Open Data Commons Open Database Licens</option>
        <option value='https://creativecommons.org/licenses/by/4.0/'>CC BY - Creative Commons Attribution</option>
        <option value='https://creativecommons.org/licenses/by-sa/4.0/'>CC BY-SA - Creative Commons Attribution-ShareAlike</option>
        <option value='http://www.gnu.org/licenses/fdl-1.3.en.html'>GNU Free Documentation License</option>
      </select>
      {(error !== '' && showError) ? <div className='control-label'>{error}</div> : undefined}
      {(helpText && showHelpText) && <i className='help_hint'>{helpText}</i>}
    </div>
  )
}

ValidLicenseInput.propTypes = {
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
  onChange: PropTypes.func.isRequired
}

ValidLicenseInput.defaultProps = {
  name: undefined,
  error: undefined,
  showError: true,
  // https://project-open-data.cio.gov/open-licenses/
  // value: 'http://www.usa.gov/publicdomain/label/1.0/',
  helpText: '',
  showHelpText: false
}

export default ValidLicenseInput
