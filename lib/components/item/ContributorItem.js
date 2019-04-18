import React from 'react'
import PropTypes from 'prop-types'
import ValidInput from '../form/ValidInput'

const ContributorItem = ({ index, data, onChange, onRemove }) => {
  const handleChange = (name, value, e) => {
    onChange(index, Object.assign({}, data, { [name]: value }))
  }

  return (
    <div className='contributor-item-flex'>
      <div className='contributor-item-flex contributor-item-inputs'>
        <ValidInput
          name='id'
          label='id'
          value={data.id}
          placeholder='id'
          onChange={handleChange}
          inline
          width={'30%'}
        />
        <ValidInput
          name='name'
          label='name'
          value={data.name}
          placeholder='name'
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
      <a className='icon-inline contributor-item-delete' onClick={() => onRemove(index)}>delete</a>
    </div>
  )
}

ContributorItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

ContributorItem.defaultProps = {
}

export default ContributorItem
