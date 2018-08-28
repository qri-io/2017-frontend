import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to={`${url}/summary`} className='navLink' activeClassName='navLinkActive'>Dataset</Link>
          </span>
          <span className={css('slideOut')}>
            <span id='Body' className={css('linkSm')}><Link to={`${url}/body`} className='navLinkSm' >Body</Link></span>
            <span id='Meta' className={css('linkSm')}><Link to={`${url}/meta`} className='navLinkSm' >Meta</Link></span>
            <span id='Structure' className={css('linkSm')}><Link to={`${url}/structure`} className='navLinkSm' >Structure</Link></span>
            <span id='Viz' className={css('linkSm')}><Link to={`${url}/viz`} className='navLinkSm' >Viz</Link></span>
            <span id='Transform' className={css('linkSm')}><Link to={`${url}/transform`} className='navLinkSm' >Transform</Link></span>
            <span id='Commit' className={css('linkSm')}><Link to={`${url}/commit`} className='navLinkSm' >Commit</Link></span>
          </span>
        </span>
        <span id='Changes' className={css('link')}>
          <Link to={`${url}/changes`} className='navLink' activeClassName='navLinkActive'>Changes</Link>
        </span>
        <span id='Render' className={css('link')}>
          <Link to={`${url}/render`} className='navLink' activeClassName='navLinkActive'>Render</Link>
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
