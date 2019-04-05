import React from 'react'
import PropTypes from 'prop-types'

import SchemaProps from '../../propTypes/schema'
import ValidInput from '../form/ValidInput'
import Button from '../chrome/Button'

const blankSchema = { type: 'array' }

// TODO - Work in Progress
export default class EditSchema extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'onChange',
      'onAdd'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChange (name, value) {
    this.props.onChange(Object.assign({}, this.props.schema, { [name]: value }))
  }

  onAdd () {
    this.props.onChange(blankSchema)
  }

  render () {
    const { style } = this.props

    if (!this.props.schema) {
      return (
        <div className='edit-schema-wrap'>
          <Button onClick={this.onAdd} test='add' />
        </div>
      )
    }

    const { title, description, type, items } = this.props.schema
    return (
      <div className='edit-schema-wrap' style={style}>
        <div>
          <EditSchemaType value={type} />
          <ValidInput name='title' label='title' onChange={this.onChange} value={title} />
          <ValidInput name='description' label='description' onChange={this.onChange} value={description} />
          {items && <EditItems items={items} />}
        </div>
      </div>
    )
  }
}

EditSchema.propTypes = {
  schema: SchemaProps.isRequired,
  onChange: PropTypes.func.isRequired
}

EditSchema.defaultProps = {
  schema: {}
}

class EditItems extends React.Component {
  constructor (props) {
    super(props);

    [
      'onChange',
      'onAdd'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChange (change) {
    this.props.onChange('items', change)
  }

  onChangeItem (i, item) {
    // TODO
    // this.props.onChange()
  }

  onAdd () {
    this.props.onChange('items', blankSchema)
  }

  render () {
    const { items } = this.props

    if (!items) {
      return (
        <div>
          <Button onClick={() => {}} test='add' />
        </div>
      )
    }

    switch (items.constructor) {
      case Array:
        return (<div>
          <small>items:</small>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {items.map((ss, i) => <EditSchema key={i} schema={ss} style={{ flex: '2 0 140px' }} onChange={(sch) => { this.onChangeItem(i, sch) }} />)}
          </div>
        </div>)
      case Object:
        return <EditSchema schema={items} onChange={this.onChange} />
      default:
        return <span>invalid items</span>
    }
  }
}

class EditSchemaType extends React.Component {
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
