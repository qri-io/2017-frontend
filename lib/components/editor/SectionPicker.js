import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { defaultPalette } from '../../propTypes/palette'

import Base from '../Base'

export default class SectionPicker extends Base {
  template (css) {
    const { links, current } = this.props

    return (
      <div className={css('wrap')}>
        <div className={css('container')}>
          {links.map((link, i) => (
            <span key={i}>
              <NavLink to={link.url} className={(link.url === current) ? css('current', 'link') : css('link')}>{link.title}</NavLink>
            </span>)
          )}
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        width: '100%',
        height: 30,
        padding: 10
      },
      container: {
        // maxWidth: 960,
        // margin: '0 auto'
      },
      link: {
        color: palette.white,
        marginRight: 16,
        fontSize: 14,
        fontWeight: 500,
        textTransform: 'uppercase'
      },
      current: {
        color: palette.primary
      }
    }
  }
}

SectionPicker.propTypes = {
  current: PropTypes.string,
  links: PropTypes.array
}

SectionPicker.defaultProps = {
  links: []
}
