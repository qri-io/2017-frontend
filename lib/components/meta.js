import React from 'react'
import MetaProps from '../propTypes/metaProps.js'
import Base from './Base'
import Json from './Json'

export default class Meta extends Base {
  template (css) {
    const { meta } = this.props
    let md = meta
    if (typeof meta === 'string') {
      md = {path: meta}
    }
    return (
      <div>
        <Json data={md} />
      </div>
    )
  }

  styles () {
    return {
      fields: {
        margin: 10,
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start'
      }
    }
  }
}

Meta.propTypes = {
  meta: MetaProps
}

Meta.defaultProps = {
}
