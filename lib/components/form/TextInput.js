import React from 'react'
import PropTypes from 'prop-types'

export default class TextInput extends React.PureComponent {
  render () {
    const { label, name, type, value, errorText, helpText, showHelpText, onChange, placeholder, white } = this.props
    const feedbackColor = errorText ? 'error' : showHelpText && helpText && 'textMuted'
    const feedback = errorText || (showHelpText &&
    helpText)
    const labelColor = white ? 'white' : 'primary'
    return (
      <div>
        <div>
          <span className={labelColor}>{label}</span>
          <input
            id={name}
            name={name}
            type={type}
            className='text-input'
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => { onChange(name, e.target.value, e) }}
          />
        </div>
        <div>
          {feedback && <h6 style={{ textAlign: 'right' }} className={feedbackColor} >{feedback}</h6>}
        </div>
      </div>
    )
  }
}

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  errorText: PropTypes.string,
  helpText: PropTypes.string,
  placeholder: PropTypes.string,
  showHelpText: PropTypes.bool,
  onChange: PropTypes.func
}

TextInput.defaultProps = {

}
