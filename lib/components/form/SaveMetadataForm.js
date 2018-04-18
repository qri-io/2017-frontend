import React from 'react'
import PropTypes from 'prop-types'

import ValidInput from './ValidInput'

import Base from '../Base'
import Spinner from '../Spinner'
import { defaultPalette } from '../../propTypes/palette'

export default class SaveMetadataForm extends Base {
  constructor (props) {
    super(props)
    this.state = {
      description: '',
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
    this.setState({ [name]: value, disabled: !value })
  }

  handleClickCancel () {
    this.props.onCancel()
  }

  handleClickSave () {
    const { description } = this.state
    this.setState({loading: true})
    this.props.onSave(this.props.localDatasetRef, description, this.props.onCancel)
  }

  template (css) {
    const { loading, feedback, description } = this.state
    return (
      <div className={css('wrap')}>
        <h1>Save Metadata</h1>
        <div className={css('formWrap')} >
          <ValidInput
            id='description'
            name='description'
            value={description}
            placeholder='Description of change'
            onChange={this.handleOnChange}
          />
          <button className='btn btn-neutral-bold' onClick={this.handleClickSave}
            disabled={this.state.disabled}>Save</button>
          <button className={`btn btn-neutral-muted ${css('cancelButton')}`} onClick={this.handleClickCancel} >Cancel</button>
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
        color: palette.gray
      },
      formWrap: {
        margin: '40px'
      },
      cancelButton: {
        marginLeft: '10px'
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
