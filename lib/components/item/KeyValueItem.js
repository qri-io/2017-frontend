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

  template (css) {
    const { data, index, onRemove } = this.props
    return (
      <div className={css('flex')}>
        <div className={css('flex', 'inputs')}>
          <ValidInput name='key' label='key' value={data.key} placeholder='key' onChange={this.handleChange} inline width={200} />
          <ValidInput name='value' label='value' value={data.value} placeholder='value' onChange={this.handleChange} inline width={200} />
        </div>
        <a className={`icon-inline ${css('delete')}`} onClick={() => onRemove(index)}>delete</a>
      </div>
    )
  }

  styles () {
    return {
      flex: {
        width: '100%',
        display: 'flex'
      },
      inputs: {
        marginRight: 10
      },
      delete: {
        paddingTop: 23,
        paddingLeft: 10
      }
    }
  }
}

KeyValueItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

KeyValueItem.defaultProps = {
}
