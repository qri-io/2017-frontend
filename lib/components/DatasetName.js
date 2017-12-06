import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class DatasetName extends Base {
  template (css) {
    const { name, large } = this.props
    const datasetLarge = large ? 'large' : undefined
    return (
      <div className={`datasetName ${datasetLarge} ${css('datasetName')}`}>{name}</div>
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
  name: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired,
  palette: Palette
}

DatasetName.defaultProps = {
  large: false,
  palette: defaultPalette
}
