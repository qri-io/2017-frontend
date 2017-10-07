/* globals __BUILD__ */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Header = ({ user, style }) => {
  return (
    <div id='header' style={style} />
  )
}

Header.propTypes = {
  style: PropTypes.object
  // onToggleMenu: PropTypes.func.isRequired,
}

Header.defaultProps = {
}

export default Header
