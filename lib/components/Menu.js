/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Menu extends React.PureComponent {
  checkActive (location) {
    return (path) => (location.pathname === path) ? 'menu-active' : 'menu-inactive'
  }

  render () {
    const { style, location } = this.props
    const isActive = this.checkActive(location)

    return (
      <div className='menu-menu' style={style}>
        <div className='menu-items'>
          <Link className={`menu-item ${isActive('/collection')}`} to='/collection'>layers</Link>
          <Link className={`menu-item ${isActive('/profile')}`} to='/profile'>user</Link>
          <Link className={`menu-item ${isActive('/profiles')}`} to='/profiles'>usergroup</Link>
          { __BUILD__.MODE !== 'production' && <Link className={`menu-item ${isActive('/stylesheet')}`} to='/stylesheet'>settingsfile</Link>}
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object
}

Menu.defaultProps = {
  location: {}
}
