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

  template (css) {
    const { data, index, onRemove } = this.props
    return (
      <div className={css('flex')}>
        <div className={css('flex', 'inputs')}>
          <div className={css('input', 'name')}><ValidInput name='name' label='name' value={data.name} placeholder='name' onChange={this.handleChange} inline /></div>
          <div className={css('input', 'url')}><ValidInput name='url' label='url' value={data.url} placeholder='url' onChange={this.handleChange} inline /></div>
          <div className={css('input', 'email')}><ValidInput name='email' label='email' value={data.email} placeholder='email' onChange={this.handleChange} inline /></div>
        </div>
        <a className={`icon-inline ${css('delete')}`} onClick={() => onRemove(index)}>delete</a>
      </div>
    )
  }

  styles () {
    return {
      flex: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
      },
      inputs: {
        justifyContent: 'space-between'
      },
      input: {
      },
      name: {
        width: '22%'
      },
      url: {
        width: '37%'
      },
      email: {
        width: '32%'
      },
      delete: {
        paddingTop: 23,
        paddingLeft: 10
      }
    }
  }
}

CitationItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

CitationItem.defaultProps = {
}
