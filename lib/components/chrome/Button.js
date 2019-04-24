import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

// Button is a the basic button used throughout the app
const Button = ({ color,
  onClick,
  full,
  loading,
  attached,
  downloadName,
  disabled,
  download,
  float,
  link,
  type,
  text,
  large }) => {
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

  if (download) {
    options['href'] = download
    options['download'] = downloadName || true
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

Button.propTypes = {
  text: PropTypes.string.isRequired, // the text written on the button
  downloadName: PropTypes.string, // the name of the file that will be downloaded.
  color: PropTypes.string, // the color of the button, default is 'primary'
  onClick: PropTypes.func, // function that will trigger when the button is clicked
  full: PropTypes.bool, // when full is true, the button has width 100%
  attached: PropTypes.bool, // should only be true when the button is used by the dropdown component
  loading: PropTypes.bool, // when true, the button is disabled and the loading spinner replaces the text
  download: PropTypes.string, // the href of what you want to make available for download. Requires download and downloadName to function properly
  link: PropTypes.string, // location that clicking the button will send you
  disabled: PropTypes.bool // if true, the button is not clickable
}

Button.defaultProps = {
  color: 'primary'
}

export default Button
