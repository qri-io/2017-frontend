import React from 'react'
import PropTypes from 'prop-types'

import ValidInput from './ValidInput'
import ValidTextarea from './ValidTextarea'

import Base from '../Base'
import Button from '../Button'
import Spinner from '../Spinner'
import { defaultPalette } from '../../propTypes/palette'

export default class SaveMetadataForm extends Base {
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
      this.setState({[name]: value})
    }
  }

  handleClickCancel () {
    this.props.onCancel()
  }

  handleClickSave () {
    const { title, message } = this.state
    this.setState({loading: true})
    this.props.onSave(this.props.localDatasetRef, title, message)
  }

  template (css) {
    const { loading, feedback, title, message } = this.state
    return (
      <div className={css('wrap')}>
        <h1>Save Metadata</h1>
        <div className={css('formWrap')} >
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
          <div className={css('cancelButton')}>
            <Button
              color='neutral-muted'
              onClick={this.handleClickCancel}
              text='Cancel'
              name='Cancel'
            />
          </div>
          { feedback ? <div className={css('feedback')}>{feedback}</div> : undefined }
          { loading ? <div className={css('floatRight')}><Spinner center={false} /></div> : undefined }
        </div>
      </div>
    )
  }

  styles (props) {
    const palette = defaultPalette
    return {
      wrap: {
        padding: '20px',
        color: palette.neutral
      },
      formWrap: {
        margin: '40px'
      },
      cancelButton: {
        marginLeft: '10px',
        display: 'inline-block'
      },
      floatRight: {
        float: 'right'
      }
    }
  }
}

SaveMetadataForm.propTypes = {
  localDatasetRef: PropTypes.object
}

SaveMetadataForm.defaultProps = {
}
