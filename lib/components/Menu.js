/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class Menu extends Base {
  checkActive (location) {
    return (path) => (location.pathname === path) ? 'active' : 'inactive'
  }

  template (css) {
    const { style, location } = this.props
    const isActive = this.checkActive(location)

    return (
      <div className={css('menu')} style={style}>
        <div className={css('items')}>
          <Link className={css('item', isActive('/datasets'))} to='/datasets'>layers</Link>
          <Link className={css('item', isActive('/peers'))} to='/peers'>usergroup</Link>
          <Link className={css('item', isActive('/profile'))} to={`/profile`}>user</Link>
          <Link className={css('item', isActive('/settings'))} to='/settings'>settings</Link>
          { __BUILD__.MODE !== 'production' && <Link className={css('item', isActive('/stylesheet'))} to='/stylesheet'>settingsfile</Link>}
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = this.props

    return {
      menu: {
        position: 'absolute',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.25)'
      },
      items: {
        marginTop: 50
      },
      active: {
        opacity: 1,
        color: palette.a
      },
      inactive: {
        opacity: 0.75
      },
      item: {
        fontFamily: 'SSPika',
        display: 'block',
        textAlign: 'center',
        textDecoration: 'none',
        fontSize: 20,
        marginTop: 10,
        transition: 'all 0.25s',
        color: palette.text,
        ':active': {
          color: palette.a,
          textDecoration: 'none'
        },
        ':focus': {
          textDecoration: 'none'
        },
        ':hover': {
          opacity: 1,
          color: palette.a
        }
      }
    }
  }
}

Menu.propTypes = {
  palette: Palette,
  location: PropTypes.object,
  user: PropTypes.object
}

Menu.defaultProps = {
  palette: defaultPalette,
  location: {}
}
