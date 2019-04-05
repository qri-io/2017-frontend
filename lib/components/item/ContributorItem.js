import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import ValidInput from '../form/ValidInput'

export default class ContributorItem extends Base {
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
      <div className='contributor-item-flex'>
        <div className='contributor-item-flex contributor-item-inputs'>
          <ValidInput name='id' label='id' value={data.id} placeholder='id' onChange={this.handleChange} inline width={'30%'} />
          <ValidInput name='name' label='name' value={data.name} placeholder='name' onChange={this.handleChange} inline width={'30%'} />
          <ValidInput name='email' label='email' value={data.email} placeholder='email' onChange={this.handleChange} inline width={'30%'} />
        </div>
        <a className='icon-inline contributor-item-delete' onClick={() => onRemove(index)}>delete</a>
      </div>
    )
  }
}

ContributorItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

ContributorItem.defaultProps = {
}
