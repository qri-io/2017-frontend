import React from 'react'
import { structureProps } from '../propTypes/datasetRefProps.js'
import Base from './Base'

import List from './List'
import FieldItem from './item/FieldItem'

export default class Structure extends Base {
  template (css) {
    const { structure } = this.props
    return (
      <div>
        {structure.schema && <List
          className={css('fields')}
          component={FieldItem}
          data={structure.schema.fields}
        />}
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

Structure.propTypes = {
  structure: structureProps
}

Structure.defaultProps = {
}
