import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class DatasetName extends Base {
  template (css) {
    const { name, large, style, save, rename } = this.props
    const datasetLarge = large ? 'large' : undefined
    const datasetName = save ? 'save' : 'datasetName'
    return (
      <div className={`datasetName ${datasetLarge} ${css(datasetName)}`} style={style}>
        { rename ? <span title='edit dataset name' className={`iconInline ${css('edit')}`} onClick={() => rename()}>pen</span> : undefined}
        {name}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      datasetName: {
        color: palette.b
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
  name: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired,
  rename: PropTypes.func
}

DatasetName.defaultProps = {
  style: {},
  large: false
}
