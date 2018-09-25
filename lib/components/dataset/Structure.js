import React from 'react'
import { structureProps } from '../../propTypes/datasetRefProps.js'
import Base from '../Base'
// import Schema from './schema/schema'
import StructureViewer from './StructureViewer'

export default class Structure extends Base {
  template (css) {
    const { structure } = this.props
    return (
      <StructureViewer structure={structure} />
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

Structure.propTypes = {
  structure: structureProps
}

Structure.defaultProps = {
}
