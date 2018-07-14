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
    data[name] = value
    onChange(index, data)
  }

  template (css) {
    const { data, index, onRemove } = this.props
    return (
      <div className={css('flex')}>
        <div className={css('flex', 'inputs')}>
          <ValidInput name='id' label='id' value={data.id} placeholder='id' onChange={this.handleChange} inline width={130} />
          <ValidInput name='name' label='name' value={data.name} placeholder='name' onChange={this.handleChange} inline width={220} />
          <ValidInput name='email' label='email' value={data.email} placeholder='email' onChange={this.handleChange} inline width={190} />
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
      delete: {
        paddingTop: 23,
        paddingLeft: 10
      }
    }
  }
}

ContributorItem.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
}

ContributorItem.defaultProps = {
}
