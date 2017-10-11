import React from 'react'
import { Link } from 'react-router-dom'

import Base from './Base'

export default class Menu extends Base {
  template (css) {
    return (
      <div className={css('menu')} {...this.props}>
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

  styles () {
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
        fontSize: 24,
        marginTop: 10
      }
    }
  }
}
