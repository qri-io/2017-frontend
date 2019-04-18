import React from 'react'
import PropTypes from 'prop-types'
import ValidInput from '../form/ValidInput'

const KeyValueItem = ({ index, data, onChange, onRemove }) => {
  const handleChange = (name, value, e) => {
    onChange(index, Object.assign({}, data, { [name]: value }))
  }

  return (
    <div className='key-value-item-flex'>
      <div className='key-value-item-flex key-value-item-inputs'>
        <ValidInput
          name='key'
          label='key'
          value={data.key}
          placeholder='key'
          onChange={handleChange}
          inline
          width={200}
        />
        <ValidInput
          name='value'
          label='value'
          value={data.value}
          placeholder='value'
          onChange={handleChange}
          inline
          width={200}
        />
      </div>
      <a className='icon-inline key-value-item-delete' onClick={() => onRemove(index)}>delete</a>
    </div>
  )
}

KeyValueItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

KeyValueItem.defaultProps = {
}

export default KeyValueItem
