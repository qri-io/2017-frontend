import React from 'react'
import { NavLink } from 'react-router-dom'
import Base from './Base'

import { defaultPalette } from '../propTypes/palette'

export default class DatasetNav extends Base {
  constructor (props) {
    super(props);

    [
      'handleOnMouseEnter',
      'handleOnMouseOut',
      'handleOnClick'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnClick (e) {
  }

  handleOnMouseEnter () {}

  handleOnMouseOut () {}

  template (css) {
    const { url } = this.props
    return (
      <div className={css('wrap')}>
        <span id='slide' >
          <span id='Dataset' style={{marginRight: 15}} onClick={this.handleOnClick}>
            <NavLink to={`${url}/summary`} className='navLink' activeClassName='navLinkActive'>Dataset</NavLink>
          </span>
          <span className={css('slideOut')}>
            <span id='Body' className={css('linkSm')}>
              <NavLink
                to={`${url}/body`}
                className='navLinkSm'
                activeClassName='navLinkSmActive' >
                Body
              </NavLink>
            </span>
            <span id='Meta' className={css('linkSm')}>
              <NavLink
                to={`${url}/meta`}
                className='navLinkSm'
                activeClassName='navLinkSmActive' >
                  Meta
              </NavLink>
            </span>
            <span id='Structure' className={css('linkSm')}>
              <NavLink
                to={`${url}/structure`}
                className='navLinkSm'
                activeClassName='navLinkSmActive'>
                  Structure
              </NavLink>
            </span>
            <span id='Viz' className={css('linkSm')}>
              <NavLink
                to={`${url}/viz`}
                className='navLinkSm'
                activeClassName='navLinkSmActive' >
                  Viz
              </NavLink>
            </span>
            <span id='Transform' className={css('linkSm')}>
              <NavLink
                to={`${url}/transform`}
                className='navLinkSm'
                activeClassName='navLinkSmActive' >
                  Transform
              </NavLink>
            </span>
            <span id='Commit' className={css('linkSm')}>
              <NavLink
                to={`${url}/commit`}
                className='navLinkSm'
                activeClassName='navLinkSmActive' >
                  Commit
              </NavLink>
            </span>
          </span>
        </span>
        <span id='Changes' className={css('link')}>
          <NavLink to={`${url}/changes`} className='navLink' activeClassName='navLinkActive'>Changes</NavLink>
        </span>
        <span id='Render' className={css('link')}>
          <NavLink to={`${url}/render`} className='navLink' activeClassName='navLinkActive'>Render</NavLink>
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
      },
      linkSm: {
        margin: '0 10px'
      }
    }
  }
}
