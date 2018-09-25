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
    let diameter = { 'sm': 64, 'md': 64, 'lg': 150 }[size]
    let border = { 'sm': 2, 'md': 4, 'lg': 4 }[size]
    let margin = { 'sm': 4, 'md': 10, 'lg': 20 }[size]

    return {
      wrap: {
        width: diameter,
        height: diameter,
        margin: margin,
        overflow: 'hidden',
        borderRadius: '100%',
        border: `${border}px solid ${palette.text}`,
        background: palette.a,
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
  size: 'sm'
}
