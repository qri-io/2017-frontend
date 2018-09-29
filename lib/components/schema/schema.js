import React from 'react'
import Base from '../Base'
import PropTypes from 'prop-types'

import { Palette } from '../../propTypes/palette'
import SchemaProps from '../../propTypes/schema'

export default class Schema extends Base {
  template (css) {
    const { style } = this.props
    if (!this.props.schema) {
      return <div className={css('wrap')}>no schema</div>
    }

    const { title, description, type, items } = this.props.schema
    return (
      <div className={css('wrap')} style={style}>
        <div className={css('properties')}>
          {type && <SchemaType type={type} />}
          {title && <pre style={{ color: Palette.text }}>{title}</pre>}
          {description && <i style={{ color: '#555', fontSize: 12, lineHeight: '10px' }}>{description}</i>}
        </div>
        <div className={css('collections')}>
          {items && <Items items={items} />}
        </div>
      </div>
    )
  }

  styles (props) {
    return {
      wrap: {
        borderRadius: 3,
        // background: 'rgb(241,243,244)',
        border: `1px solid #eee`,
        margin: '5px 10px'
      },
      properties: {
        margin: '5px 10px'
      }
    }
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
