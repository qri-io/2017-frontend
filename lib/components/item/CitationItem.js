import React from 'react'
import PropTypes from 'prop-types'
import ValidInput from '../form/ValidInput'

const CitationItem = ({ index, data, onChange, onRemove }) => {
  const handleChange = (name, value, e) => {
    data[name] = value
    onChange(index, data)
  }

  return (
    <div className='citation-item-flex'>
      <div className='citation-item-flex citation-item-inputs'>
        <ValidInput
          name='name'
          label='name'
          value={data.name}
          placeholder='name'
          onChange={handleChange}
          inline width={'30%'}
        />
        <ValidInput
          name='url'
          label='url'
          value={data.url}
          placeholder='url'
          onChange={handleChange}
          inline
          width={'30%'}
        />
        <ValidInput
          name='email'
          label='email'
          value={data.email}
          placeholder='email'
          onChange={handleChange}
          inline
          width={'30%'}
        />
      </div>
      <a className='icon-inline citation-item-delete' onClick={() => onRemove(index)}>delete</a>
    </div>
  )
}

CitationItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

CitationItem.defaultProps = {
}

export default CitationItem
