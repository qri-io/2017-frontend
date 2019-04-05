import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import ValidInput from '../form/ValidInput'

export default class KeyValueItem extends Base {
  constructor (props) {
    super(props);

    [
      'handleChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleChange (name, value, e) {
    const { index, data, onChange } = this.props
    onChange(index, Object.assign({}, data, { [name]: value }))
  }

  render () {
    const { data, index, onRemove } = this.props
    return (
      <div className='key-value-item-flex'>
        <div className='key-value-item-flex key-value-item-inputs'>
          <ValidInput name='key' label='key' value={data.key} placeholder='key' onChange={this.handleChange} inline width={200} />
          <ValidInput name='value' label='value' value={data.value} placeholder='value' onChange={this.handleChange} inline width={200} />
        </div>
        <a className='icon-inline key-value-item-delete' onClick={() => onRemove(index)}>delete</a>
      </div>
    )
  }
}

KeyValueItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

KeyValueItem.defaultProps = {
}
