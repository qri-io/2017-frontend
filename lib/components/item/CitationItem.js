import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import ValidInput from '../form/ValidInput'

export default class CitationItem extends Base {
  constructor (props) {
    super(props);

    [
      'handleChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleChange (name, value, e) {
    const { index, data, onChange } = this.props
    data[name] = value
    onChange(index, data)
  }

  render () {
    const { data, index, onRemove } = this.props
    return (
      <div className='citation-item-flex'>
        <div className='citation-item-flex citation-item-inputs'>
          <ValidInput name='name' label='name' value={data.name} placeholder='name' onChange={this.handleChange} inline width={'30%'} />
          <ValidInput name='url' label='url' value={data.url} placeholder='url' onChange={this.handleChange} inline width={'30%'} />
          <ValidInput name='email' label='email' value={data.email} placeholder='email' onChange={this.handleChange} inline width={'30%'} />
        </div>
        <a className='icon-inline citation-item-delete' onClick={() => onRemove(index)}>delete</a>
      </div>
    )
  }
}

CitationItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

CitationItem.defaultProps = {
}
