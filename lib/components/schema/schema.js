import React from 'react'
import Base from '../Base'

import SchemaProps from '../../propTypes/schema'

export default class Schema extends Base {
  template (css) {
    const { schema } = this.props
    return (
      <div className={`schema ${css('wrap')}`}>
        {schema.type}
      </div>
    )
  }

  styles (props) {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      }
    }
  }
}

Schema.propTypes = {
  schema: SchemaProps.isRequired
}

Schema.defaultProps = {
}
