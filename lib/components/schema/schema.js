import React from 'react'

import PropTypes from 'prop-types'

import { Palette } from '../../propTypes/palette'
import SchemaProps from '../../propTypes/schema'

export default class Schema extends React.PureComponent {
  render () {
    const { style } = this.props
    if (!this.props.schema) {
      return <div className='schema-wrap'>no schema</div>
    }

    const { title, description, type, items } = this.props.schema
    return (
      <div className='schema-wrap' style={style}>
        <div className='schema-properties'>
          {type && <SchemaType type={type} />}
          {title && <pre style={{ color: Palette.text }}>{title}</pre>}
          {description && <i style={{ color: '#555', fontSize: 12, lineHeight: '10px' }}>{description}</i>}
        </div>
        <div>
          {items && <Items items={items} />}
        </div>
      </div>
    )
  }
}

Schema.propTypes = {
  schema: SchemaProps.isRequired,
  style: PropTypes.object
}

Schema.defaultProps = {
  schema: {}
}

class Items extends React.Component {
  renderItems (items) {
    switch (items.constructor) {
      case Array:
        return (
          <div style={{ display: 'flex', overflowX: 'auto', padding: '0 10px 0 0 ' }}>
            {items.map((ss, i) => <Schema key={i} schema={ss} style={{ flex: '2 0 140px' }} />)}
          </div>)
      case Object:
        return <Schema schema={items} />
      default:
        return <span>invalid items</span>
    }
  }

  itemsLabel (items) {
    switch (items.constructor) {
      case Array:
        const len = items.length
        return (len === 1) ? `1 item` : `${len} items`
      default:
        return 'items'
    }
  }

  render () {
    const { items } = this.props

    return (
      <div>
        <small style={{ marginLeft: 10 }}>{ this.itemsLabel(items) }</small>
        {this.renderItems(items)}
      </div>
    )
  }
}

class SchemaType extends React.Component {
  renderTag (type, i) {
    return <span className={`dt-${type}`} key={i}>{type}</span>
  }

  render () {
    const { type } = this.props

    switch (type.constructor) {
      case Array:
        return type.map(this.renderTag)
      case String:
        return this.renderTag(type)
      default:
        return <span>invalid type</span>
    }
  }
}
