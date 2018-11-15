import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Button from '../chrome/Button'
import MetadataForm from '../form/MetadataForm'

export default class EditMeta extends Base {
  constructor (props) {
    super(props);

    [
      'onChange',
      'onAddMeta',
      'onRemoveMeta'
    ].forEach(m => { this[m] = this[m].bind(this) })
  }

  onChange (key, value) {
    const { meta } = this.props
    this.props.onChange(Object.assign({}, meta, { [key]: value }))
  }

  onAddMeta () {
    this.props.onChange(Object.assign({ title: 'my dataset' }))
  }

  onRemoveMeta () {
    this.props.onRemove('meta')
  }

  template (css) {
    const { meta } = this.props

    if (!Object.keys(meta).length) {
      return (
        <div className={css('wrap')}>
          <div className={css('center')}>
            <Button onClick={this.onAddMeta} color='b' text='Add Metadata' />
          </div>
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          <Button onClick={this.onRemoveMeta} color='b' text='Remove' />
        </header>
        <div className={css('content')}>
          <MetadataForm
            meta={meta}
            onChange={this.onChange}
            showHelpText
          />
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      center: {
        width: 200,
        margin: '150px auto'
      },
      header: {
        flex: '1 1 30px',
        padding: '10px 4px 2px 10px',
        display: 'flex',
        justifyContent: 'flex-end'
      },
      content: {
        flex: '2 1 95%',
        padding: 20,
        width: '100%',
        overflow: 'auto'
      }
    }
  }
}

EditMeta.propTypes = {
  meta: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

EditMeta.defaultProps = {
  meta: {}
}
