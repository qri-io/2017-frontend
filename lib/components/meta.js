import React from 'react'
import PropTypes from 'prop-types'
import MetaProps from '../propTypes/metaProps.js'
import Base from './Base'
import Json from './Json'
import Button from './Button'

export default class Meta extends Base {
  template (css) {
    const { meta, onClickEdit } = this.props

    let md = meta
    if (typeof meta === 'string') {
      md = {path: meta}
    }
    return (
      <div className={css('flex')}>
        {md ? <Json data={md} /> : <p>This dataset currently has no specified metadata</p>}
        {onClickEdit ? <Button color='e' text='Edit' name='Edit' onClick={onClickEdit} /> : undefined}
      </div>
    )
  }

  styles () {
    return {
      flex: {
        marginRight: 10,
        display: 'flex',
        justifyContent: 'space-between'
      }
    }
  }
}

Meta.propTypes = {
  meta: MetaProps,
  onClickEdit: PropTypes.func
}

Meta.defaultProps = {
}
