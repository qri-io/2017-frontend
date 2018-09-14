import React from 'react'

import Json from './Json'
import Base from './Base'
import MetaProps from '../propTypes/metaProps.js'
import { defaultPalette } from '../propTypes/palette'

export default class Meta extends Base {
  template (css) {
    const { meta } = this.props

    if (meta === undefined) {
      return (<p>No meta found for this dataset.</p>)
    }

    let md = meta
    if (typeof meta === 'string') {
      md = { path: meta }
    }
    return (
      <Json body={md} />
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      flex: {
        display: 'flex',
        justifyContent: 'space-between'
      },
      fields: {
        fontSize: 14,
        marginTop: 20
      },
      value: {
        marginLeft: 5
      },
      key: {
        color: palette.neutral
      },
      meta: {
        marginRight: 20
      }
    }
  }
}

Meta.propTypes = {
  meta: MetaProps
}

Meta.defaultProps = {
}
