import React from 'react'
import PropTypes from 'prop-types'

import ValidInput from './ValidInput'
import ValidTextarea from './ValidTextarea'
import Button from '../chrome/Button'
import Spinner from '../chrome/Spinner'

// TODO (ramfox): unused component, marking for deprecation
export default class SaveMetadataForm extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      message: '',
      disabled: true,
      feedback: '',
      loading: false
    };

    [
      'handleOnChange',
      'handleClickCancel',
      'handleClickSave'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleOnChange (name, value, e) {
    if (name === 'title' && value !== '') {
      this.setState({ title: value, disabled: false })
    } else if (name === 'title' && value === '') {
      this.setState({ title: value, disabled: true })
    } else {
      this.setState({ [name]: value })
    }
  }

  handleClickCancel () {
    this.props.onCancel()
  }

  handleClickSave () {
    const { title, message } = this.state
    this.setState({ loading: true })
    this.props.onSave(this.props.localDatasetRef, title, message)
  }

  render () {
    const { loading, feedback, title, message } = this.state
    return (
      <div className='save-metadata-form-wrap'>
        <h1>Save Metadata</h1>
        <div className='save-metadata-form-form-wrap' >
          <ValidInput
            id='title'
            name='title'
            value={title}
            placeholder='Description of change (required)'
            onChange={this.handleOnChange}
          />
          <ValidTextarea
            id='message'
            name='message'
            value={message}
            placeholder='Expanded description of change (optional)'
            onChange={this.handleOnChange}
          />
          <Button
            color='a'
            onClick={this.handleClickSave}
            disabled={this.state.disabled}
            text='Save'
            name='Save'
          />
          <div className='save-metadata-form-cancel-button'>
            <Button
              color='neutral-muted'
              onClick={this.handleClickCancel}
              text='Cancel'
              name='Cancel'
            />
          </div>
          { feedback ? <div>{feedback}</div> : undefined }
          { loading ? <div className='save-metadata-form-float-right'><Spinner center={false} /></div> : undefined }
        </div>
      </div>
    )
  }
}

SaveMetadataForm.propTypes = {
  localDatasetRef: PropTypes.object
}

SaveMetadataForm.defaultProps = {
}
