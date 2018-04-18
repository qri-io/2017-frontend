import React from 'react'
import PropTypes from 'prop-types'

import ValidInput from './form/ValidInput'

import Base from './Base'

export default class NameDataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
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
    const {datasetRef} = this.props.data
    if (datasetRef && datasetRef.name) {
      this.setState({name: datasetRef.name, disabled: false})
    }
  }

  handleOnChange (name, value, e) {
    if (name === 'name' && value.slice(-1) === ' ') {
      return
    }
    this.setState({ [name]: value }, this.handleDisableButton)
  }

  handleDisableButton () {
    const { name } = this.state
    if (name) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }

  handleHideModal () {
    this.props.data.hideModal()
  }

  handleClickSave (e) {
    const { handleNameDataset, datasetRef } = this.props.data
    handleNameDataset(datasetRef, this.state.name, this.handleHideModal)
  }

  template (css) {
    return (
      <div className={css('wrap')}>
        <h1>Name Dataset</h1>
        <div className={css('formWrap')} >
          <ValidInput
            id='name'
            name='name'
            value={this.state.name}
            placeholder='Name'
            onChange={this.handleOnChange}
          />
          <button className='btn btn-neutral-bold'
            onClick={this.handleClickSave} disabled={this.state.disabled}>Save</button>
          <button className={`btn btn-neutral-muted ${css('cancelButton')}`} onClick={this.handleHideModal}>Cancel</button>
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

NameDataset.propTypes = {
  data: PropTypes.object.isRequired
}

NameDataset.defaultProps = {
}
