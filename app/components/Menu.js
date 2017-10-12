import React from 'react'
import { Link } from 'react-router-dom'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class Menu extends Base {
  template (css) {
    const { style } = this.props

    return (
      <div className={css('menu')} style={style}>
        <div className={css('items')}>
          <Link className={css('item')} to='/'>navigateright</Link>
          <Link className={css('item')} to='/datasets'>layers</Link>
          <Link className={css('item')} to='/peers'>usergroup</Link>
          <Link className={css('item')} to='/settings'>settings</Link>
          <Link className={css('item')} to='/stylesheet'>settingsfile</Link>
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
      item: {
        fontFamily: 'SSPika',
        display: 'block',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        color: palette.text,
        ':active': {
          color: palette.a,
          textDecoation: 'none'
        },
        ':hover': {
          color: palette.a,
          textDecoation: 'none'
        }
      }
    }
  }
}

Menu.propTypes = {
  palette: Palette
}

Menu.defaultProps = {
  palette: defaultPalette
}
