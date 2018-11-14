import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class TextInput extends Base {
  template (css) {
    const { label, name, type, value, errorText, helpText, showHelpText, onChange, placeholder } = this.props
    const feedbackColor = errorText ? 'error' : showHelpText && helpText && 'textMuted'
    const feedback = errorText || (showHelpText &&
    helpText)
    return (
      <div className={css('wrap')}>
        <div className={css('input')} >
          <span className='primary'>{label}</span>
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
        <div className={css('feedback')} >
          {feedback && <h6 style={{ textAlign: 'right' }} className={feedbackColor} >{feedback}</h6>}
        </div>

      </div>
    )
  }
  styles () {
    return {
    }
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
