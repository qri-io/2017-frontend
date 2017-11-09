import React from 'react'
import PropTypes from 'prop-types'

import ValidInput from './ValidInput'
import ValidTextArea from './ValidTextArea'

import Base from '../Base'
import { Palette, defaultPalette } from '../../propTypes/palette'

export default class SaveQueryForm extends Base {
  constructor (props) {
    super(props)
    this.state = {
      feedback: '',
      name: '',
      description: '',
      message: '',
      disabled: true
    };
    [
      'handleOnChange',
      'handleDisableButton',
      'handleClickSave',
      'handleHideModal'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    console.log(this.props.query)
    if (this.props.query && this.props.query.dataset && this.props.query.dataset.queryString) {
      this.setState({description: this.props.query.dataset.queryString})
    }
  }

  handleOnChange (name, value, e) {
    if (name === 'name' && value.slice(-1) === ' ') {
      return
    }
    this.setState({ [name]: value }, this.handleDisableButton)
  }

  handleDisableButton () {
    const { name, description } = this.state
    if (name && description) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }

  handleHideModal () {
    this.props.hideModal()
  }

  handleClickSave (e) {
    const { query } = this.props
    const { name, description, message } = this.state
    this.props.addDataset(query.path, name, description, message,
      () => {
        this.props.loadDatasets()
        this.props.hideModal()
      })
  }

  template (css) {
    const { query } = this.props
    return (
      <div className={css('wrap')}>
        <h1>Save Query as New Dataset</h1>
        <div className={css('formWrap')} >
          <ValidInput
            id='name'
            name='name'
            value={this.state.name}
            placeholder='Name'
            onChange={this.handleOnChange}
          />
          <ValidInput
            id='description'
            name='description'
            value={this.state.description}
            placeholder='Query Description'
            onChange={this.handleOnChange}
          />
          <ValidTextArea
            id='message'
            name='message'
            value={this.state.message}
            placeholder='(Optional) Detailed message about query'
            onChange={this.handleOnChange}
          />
          <button className='btn btn-primary'
            onClick={this.handleClickSave} disabled={this.state.disabled}>Save</button>
          <button className={`btn btn-secondary ${css('cancelButton')}`} onClick={this.handleHideModal}>Cancel</button>
          { this.state.feedback ? <div className={css('feedback')}>{this.state.feedback}</div> : undefined }
        </div>
      </div>
    )
  }
  styles () {
    return {
      wrap: {
        padding: '20px',
        maxWidth: '600px'
      },
      formWrap: {
        marginTop: '40px'
      },
      cancelButton: {
        marginLeft: '10px'
      }
    }
  }
}

SaveQueryForm.PropTypes = {
  query: PropTypes.object.isRequired,
  onClickCancel: PropTypes.func.isRequired
}

SaveQueryForm.defaultProps = {

}
