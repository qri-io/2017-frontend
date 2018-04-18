import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'
import Base from './Base'

export default class Button extends Base {
  template (css) {
    const {color, onClick, full, loading} = this.props
    const className = 'btn btn-' + color
    const width = full ? css('full') : ''
    return (
      <button className={`${className} ${width}`} onClick={onClick}>
        {loading ? <Spinner button center={false} /> : this.props.text}
      </button>
    )
  }

  styles () {
    return {
      full: {
        width: '100%'
      },
      dropDown: {
        marginTop: 0,
        marginLeft: 5,
        display: 'inline-block'
      }
    }
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  full: PropTypes.bool,
  dropDown: PropTypes.bool
}

Button.defaultProps = {
  color: 'a'
}
