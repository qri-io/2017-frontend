import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class DatasetName extends Base {
  template (css) {
    const { peername, name, large, style, save, rename, xlarge } = this.props
    const datasetLarge = large ? 'large' : undefined
    const datasetName = save ? 'save' : 'datasetName'
    return (
      <div className={`datasetName ${datasetLarge} ${xlarge ? css('xlarge') : undefined} ${css(datasetName)}`} style={style}>
        {peername ? `${peername}/${name}` : name}
        { rename ? <span title='edit dataset name' className={`icon-inline ${css('edit')}`} onClick={() => rename()}>pen</span> : undefined}
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
        marginLeft: 8,
        cursor: 'pointer',
        color: palette.neutral,
        ':hover': {
          color: palette.d
        }
      },
      xlarge: {
        fontSize: 30
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
