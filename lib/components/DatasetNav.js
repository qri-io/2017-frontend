import React from 'react'
import { NavLink } from 'react-router-dom'
import Base from './Base'

import { defaultPalette } from '../propTypes/palette'

export default class DatasetNav extends Base {
  template (css) {
    const { url } = this.props
    return (
      <div className={css('wrap')} >
        <span id='Render' style={{marginRight: 15}} >
          <NavLink to={`${url}/render`} className='navLink' activeClassName='navLinkActive'>Render</NavLink>
        </span>
        <span id='Dataset' className={css('link')}>
          <NavLink to={`${url}/summary`} className='navLink' activeClassName='navLinkActive'>Dataset</NavLink>
        </span>
        <span id='Body' className={css('link')}>
          <NavLink
            to={`${url}/body`}
            className='navLink'
            activeClassName='navLinkActive' >
            Body
          </NavLink>
        </span>
        <span id='Changes' className={css('link')}>
          <NavLink to={`${url}/changes`} className='navLink' activeClassName='navLinkActive'>Changes</NavLink>
        </span>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        background: palette.text,
        display: 'flex',
        alignItems: 'center'
      },
      link: {
        margin: '0 15px'
      }
    }
  }
}
