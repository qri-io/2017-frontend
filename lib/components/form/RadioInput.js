import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class RadioInput extends Base {
  template (css) {
    const {name, value, text, color, defaultChecked, onChange} = this.props
    const className = 'radio-' + color
    return (
      <span className={css('span')}><input className={className} type='radio' name={name} value={value} defaultChecked={defaultChecked} onChange={onChange} />{text}</span>
    )
  }
  styles () {
    return {
    }
  }
}

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func
}

RadioInput.defaultProps = {
  color: 'a'
}
