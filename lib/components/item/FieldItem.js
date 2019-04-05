import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

function dataTypeColor (type, palette = defaultPalette) {
  switch (type) {
    case 'string':
      return palette.text
    case 'integer':
      return palette.primary
    case 'float':
      return palette.primary
    case 'boolean':
      return palette.primary
    case 'date':
      return palette.primary
    default:
      return palette.text
  }
}

export default class FieldItem extends Base {
  render () {
    const { data, onSelect, palette, index } = this.props

    return (
      <div className='field-item-wrap'>
        <p className='field-item-datatype' style={{ color: dataTypeColor(data.type, palette) }}><b className='field-item-index'>{index + 1}</b> {data.type}</p>
        <h5 className='field-item-title' onClick={onSelect}>{data.name}</h5>

        {data.missingValue && <p className='code muted'>default value: {data.missingValue}</p>}
        {data.description && <p className='field-item-description'>{data.description}</p>}
      </div>
    )
  }
}

FieldItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
}

FieldItem.defaultProps = {
}
