import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class DatasetName extends Base {
  template (css) {
    const { peername, name, large, style, save, rename } = this.props
    const datasetLarge = large ? 'large' : undefined
    const datasetName = save ? 'save' : 'datasetName'
    return (
      <div className={`datasetName ${datasetLarge} ${css(datasetName)}`} style={style}>
        { rename ? <span title='edit dataset name' className={`icon-inline ${css('edit')}`} onClick={() => rename()}>pen</span> : undefined}
        {peername ? `${peername}/${name}` : name}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      datasetName: {
        color: palette.d
      },
      save: {
        color: palette.a,
        ':hover': {
          color: palette.hover
        }
      },
      edit: {
        marginRight: 8,
        cursor: 'pointer'
      }
    }
  }
}

DatasetName.propTypes = {
  style: PropTypes.object,
  peername: PropTypes.string,
  name: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired,
  rename: PropTypes.func
}

DatasetName.defaultProps = {
  style: {},
  large: false
}
