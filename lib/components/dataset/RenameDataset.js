import React from 'react'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'
import DatasetRefProps from '../../propTypes/datasetRefProps'
import Button from '../chrome/Button'

import { DATASET_RENAME_SUCCESS } from '../../constants/dataset'

export default class RenameDataset extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      disabled: true,
      error: ''
    };
    [
      'handleOnChange',
      'handleDisableButton',
      'handleClickRename'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    const { datasetRef } = this.props
    if (datasetRef && datasetRef.name) {
      this.setState({ name: datasetRef.name, disabled: false })
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

  handleClickRename (e) {
    const { onRename, datasetRef, onCancel, history } = this.props
    onRename(datasetRef, this.state.name)
      .then(action => {
        if (action.type === DATASET_RENAME_SUCCESS) {
          history.push(`/${datasetRef.peername}/${this.state.name}`)
          onCancel()
        }
        this.setState({ error: action.error })
      })
  }

  render () {
    return (
      <div className='white rename-dataset-wrap'>
        <h1 className='white'>Rename Dataset</h1>
        <div className='rename-dataset-form-wrap' >
          <TextInput
            id='name'
            name='name'
            value={this.state.name}
            onChange={this.handleOnChange}
            label='Dataset Name:'
            white
          />
          <div className='rename-dataset-buttons'>
            <Button
              onClick={this.handleClickRename}
              disabled={this.state.disabled}
              text='Rename'
            />
            <a
              onClick={this.props.onCancel}
              className='white'
            >Cancel</a>
          </div>
          { this.state.error && <div className='white'>{this.state.error}</div> }
        </div>
      </div>
    )
  }
}

RenameDataset.propTypes = {
  datasetRef: DatasetRefProps.isRequired,
  onRename: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

RenameDataset.defaultProps = {
}
