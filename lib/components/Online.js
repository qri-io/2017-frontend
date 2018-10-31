import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class Online extends Base {
  template (css) {
    const { online, style, small } = this.props
    const className = `${online ? css('online') : css('offline')} ${small ? css('small') : css('regular')}`
    return (
      <div className={className} style={style}>
        <span className={`icon-inline ${small ? css('small') : ''}`}>{online ? 'flash' : 'hyphen'}</span>
        <span className={css('text')}>{ online ? '  online' : '  offline' }</span>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      online: {
        color: palette.primary,
        margin: 0
      },
      offline: {
        color: palette.primaryLight,
        margin: 0
      },
      text: {
        marginLeft: 5,
        position: 'relative',
        top: -2
      },
      small: {
        fontSize: 14
      },
      regular: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    }
  }
}

Online.propTypes = {
  online: PropTypes.bool,
  style: PropTypes.object,
  small: PropTypes.bool
}

Online.defaultProps = {
}
