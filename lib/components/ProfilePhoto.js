/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class ProfilePhoto extends Base {
  template (css) {
    const { peer = {} } = this.props
    return (
      <div className={css('wrap')}>
        <img className={css('image')} src={peer.profile && `${__BUILD__.API_URL}${peer.profile}`} />
      </div>
    )
  }

  styles (props) {
    const { palette, size } = this.props
    let diameter = { 'sm': 32, 'md': 64, 'lg': 150 }[size]
    let border = { 'sm': 2, 'md': 4, 'lg': 6 }[size]
    let margin = { 'sm': 4, 'md': 10, 'lg': 20 }[size]

    return {
      wrap: {
        width: diameter,
        height: diameter,
        margin: margin,
        overflow: 'hidden',
        borderRadius: '100%',
        border: `${border}px solid #000`,
        background: palette.a
      },
      image: {
        width: '100%'
      }
    }
  }
}

ProfilePhoto.propTypes = {
  palette: Palette,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  peer: PropTypes.object.isRequired
}

ProfilePhoto.defaultProps = {
  size: 'sm',
  palette: defaultPalette
}
