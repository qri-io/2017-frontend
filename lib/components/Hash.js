import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class Hash extends Base {
  template (css) {
    const { hash, datasetRef, short, noPrefix, style } = this.props
    let displayHash = hash || datasetRef.path
    if (displayHash.length < 52) {
      displayHash = 'invalid hash'
    } else {
      displayHash = displayHash.slice('/ipfs/'.length)
      displayHash = short ? displayHash.slice(0, 2) + '...' + displayHash.slice(-6) : displayHash
    }
    return (
      <div className={`stats ${css('hash')}`} style={style} >
        {!noPrefix && <span className={css('prefix')}>/ipfs/</span>}
        {displayHash}
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      prefix: {
        color: palette.muted
      },
      hash: {
        color: palette.lightGray
      }
    }
  }
}

Hash.propTypes = {
  short: PropTypes.bool,
  noPrefix: PropTypes.bool,
  palette: Palette,
  style: PropTypes.object
}

Hash.defaultProps = {
  style: {},
  short: false,
  noPrefix: false,
  palette: defaultPalette,
  datasetRef: {}
}
