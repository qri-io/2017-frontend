import React from 'react'
import PropTypes from 'prop-types'
import Button from '../chrome/Button'
import MetadataForm from '../form/MetadataForm'

export default class EditMeta extends React.PureComponent {
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

  render () {
    const { meta } = this.props

    if (!Object.keys(meta).length) {
      return (
        <div className='edit-meta-wrap'>
          <div className='edit-meta-center'>
            <Button onClick={this.onAddMeta} color='b' text='Add Metadata' />
          </div>
        </div>
      )
    }

    return (
      <div className='edit-meta-wrap'>
        <header className='edit-meta-header'>
          <Button onClick={this.onRemoveMeta} color='b' text='Remove' />
        </header>
        <div className='edit-meta-content'>
          <MetadataForm
            meta={meta}
            onChange={this.onChange}
            showHelpText
          />
        </div>
      </div>
    )
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
