import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class Breadcrumb extends Base {
  template (css) {
    const { links } = this.props

    return (
      <div className={css('wrap')}>
        {links.map((link, i) => <span key={i}><NavLink to={link.url} className={(i === links.length - 1) ? css('current') : css('link')}>{link.title}</NavLink>{(i < links.length - 1) && <span className={css('slash')}>/</span>}</span>)}
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        margin: '30px 0 20px 0',
        fontSize: 20
      },
      current: {
        color: defaultPalette.neutral
      },
      link: {
        color: defaultPalette.a
      },
      slash: {
        marginLeft: 5,
        marginRight: 5
      }
    }
  }
}

Breadcrumb.propTypes = {
  links: PropTypes.array.isRequired
}

Breadcrumb.defaultProps = {
  links: [{ 'title': '/', 'url': '/' }]
}
