import React from 'react'
import { structureProps } from '../../propTypes/datasetRefProps.js'

import StructureViewer from './StructureViewer'

export default class Structure extends React.PureComponent {
  render () {
    const { structure } = this.props
    return (
      <StructureViewer structure={structure} />
    )
  }
}

Structure.propTypes = {
  structure: structureProps
}

Structure.defaultProps = {
}
