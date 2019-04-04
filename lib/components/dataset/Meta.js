import React from 'react'

import MetadataViewer from './MetadataViewer'
import Base from '../Base'
import MetaProps from '../../propTypes/metaProps.js'

export default class Meta extends Base {
  render () {
    const { meta } = this.props

    if (meta === undefined) {
      return (<p style={{ margin: 20 }}>No meta found for this dataset.</p>)
    }

    let md = meta
    if (typeof meta === 'string') {
      md = { path: meta }
    }
    return (
      <MetadataViewer metadata={md} />
    )
  }
}

Meta.propTypes = {
  meta: MetaProps
}

Meta.defaultProps = {
}
