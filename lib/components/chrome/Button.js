import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from './Spinner'
import Base from '../Base'

export default class Button extends Base {
  render () {
    const { color, onClick, full, loading, attached, downloadName, disabled, download, float, link, type, text, large } = this.props
    const className = 'btn btn-' + color
    const size = large ? 'btn-large' : ''

    var options = {}
    options['className'] = `${className} ${full && 'button-full'} ${attached && 'button-attached'} ${float || ''} ${size}`
    options['disabled'] = loading || disabled
    options['onClick'] = onClick
    options['type'] = type

    if (link) {
      return (
        <Link to={link}>
          <button {...options}>
            {loading ? <Spinner button center={false} white large={large} /> : text}
          </button>
        </Link>
      )
    }

    if (download && downloadName) {
      options['href'] = download
      options['download'] = download ? `${downloadName}.zip` : undefined
      return (
        <a {...options}>
          {loading ? <Spinner button center={false} white large={large} /> : text}
        </a>
      )
    }
    return (
      <button {...options}>
        {loading ? <Spinner button center={false} white large={large} /> : text}
      </button>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  downloadName: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  full: PropTypes.bool,
  attached: PropTypes.bool,
  loading: PropTypes.bool,
  download: PropTypes.string,
  link: PropTypes.string,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  color: 'primary'
}
