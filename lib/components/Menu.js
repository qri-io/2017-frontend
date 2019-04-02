/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Base from './Base'

export default class Menu extends Base {
  checkActive (location) {
    return (path) => (location.pathname === path) ? 'active' : 'inactive'
  }

  render () {
    const { style, location } = this.props
    const isActive = this.checkActive(location)

    return (
      <div className={css('menu')} style={style}>
        <div className={css('items')}>
          <Link className={css('item', isActive('/collection'))} to='/collection'>layers</Link>
          <Link className={css('item', isActive('/profile'))} to='/profile'>user</Link>
          <Link className={css('item', isActive('/profiles'))} to='/profiles'>usergroup</Link>
          { __BUILD__.MODE !== 'production' && <Link className={css('item', isActive('/stylesheet'))} to='/stylesheet'>settingsfile</Link>}
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
