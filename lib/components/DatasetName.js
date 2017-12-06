import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class DatasetName extends Base {
  template (css) {
    const { name, large, style } = this.props
    const datasetLarge = large ? 'large' : undefined
    return (
      <div className={`datasetName ${datasetLarge} ${css('datasetName')}`} style={style}>{name}</div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      datasetName: {
        color: palette.b
      }
    }
  }
}

DatasetName.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired,
  palette: Palette
}

DatasetName.defaultProps = {
  style: {},
  large: false,
  palette: defaultPalette
}
