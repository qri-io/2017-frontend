/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class ProfilePhoto extends Base {
  template (css) {
    const { profile = {} } = this.props
    return (
      <div className={css('wrap')} style={{
        backgroundImage: profile.photo ? `url("${__BUILD__.API_URL}${profile.photo}")` : '#111'
      }} />
    )
  }

  styles () {
    const palette = defaultPalette
    const { size } = this.props
    let side = { 'sm': 34, 'md': 64, 'lg': 150 }[size]
    let borderRadius = { 'sm': 5, 'md': 7, 'lg': 10 }[size]
    return {
      wrap: {
        width: side,
        height: side,
        overflow: 'hidden',
        borderRadius: borderRadius,
        background: palette.primary,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  }
}

ProfilePhoto.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  profile: PropTypes.object
}

ProfilePhoto.defaultProps = {
  size: 'md'
}