import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'
import Base from './Base'

export default class Button extends Base {
  template (css) {
    const {color, onClick, full, loading, attached, name, download, disabled} = this.props
    const className = 'btn btn-' + color

    var options = {}
    options['className'] = `${className} ${full ? css('full'
        ) : undefined} ${attached ? css('attached') : undefined}`
    options['disabled'] = loading || disabled
    options['onClick'] = onClick
    options['ref'] = name

    if (download) {
      options['href'] = download
      options['download'] = download ? `${name}.zip` : undefined
      return (
        <a {...options}>
          {loading ? <Spinner button center={false} /> : this.props.text}
        </a>
      )
    }
    return (
      <button {...options}>
        {loading ? <Spinner button center={false} /> : this.props.text}
      </button>
    )
  }

  styles () {
    return {
      full: {
        width: '100%'
      },
      attached: {
        borderRadius: '3px 0 0 3px'
      }
    }
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  full: PropTypes.bool,
  attached: PropTypes.bool,
  loading: PropTypes.bool,
  download: PropTypes.string
}

Button.defaultProps = {
  color: 'a'
}
