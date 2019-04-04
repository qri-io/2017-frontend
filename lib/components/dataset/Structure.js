import React from 'react'
import { structureProps } from '../../propTypes/datasetRefProps.js'
import Base from '../Base'
import StructureViewer from './StructureViewer'

export default class Structure extends Base {
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
