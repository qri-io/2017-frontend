import React, { PropTypes } from 'react'

import MetadataForm from './form/MetadataForm'
import Spinner from './Spinner'

import DatasetRefProps from '../propTypes/datasetRefProps'

export default class MetadataEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: !(this.props.datasetRef && this.props.localDatasetRef),
      showHelp: true
    };

    [
      'handleChange',
      'handleCancel',
      'handleSave',
      'handleToggleHelp'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { path, localDatasetRef, datasetRef } = this.props
    if (path) {
      this.props.loadDataset(path)
    }
    if (!localDatasetRef && datasetRef) {
      const { name, path, dataset } = this.props.datasetRef
      this.props.newDataset({name: name, path: path}, dataset)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { path, localDatasetRef, datasetRef } = nextProps
    if (!localDatasetRef && datasetRef) {
      const { name, path, dataset } = nextProps.datasetRef
      nextProps.newDataset({name: name, path: path}, dataset)
    }
    if (localDatasetRef && datasetRef) {
      this.setState({ loading: false })
    }
  }

  handleChange (name, value) {
    const { dataset } = this.props.localDatasetRef
    const updatedDataset = Object.assign(dataset, { [name]: value })
    const change = Object.assign(this.props.localDatasetRef, { dataset: updatedDataset})
    this.props.updateDataset(change)
  }

  handleCancel () {
    this.props.hideModal()
    this.props.cancelDatasetEdit(this.props.path)
  }

  handleSave (localDatasetRef) {
    this.props.saveDataset(localDatasetRef)
    this.handleCancel(localDatasetRef.path)
  }

  handleToggleHelp () {
    this.setState({ showHelp: !this.state.showHelp })
  }

  render () {
    if (this.state.loading) {
      return <Spinner />
    } else {
      const { showHelp } = this.state
      return (
        <div className='metadata editor col-md-12'>
          <a className='helpToggle right' onClick={this.handleToggleHelp}>{showHelp ? 'hide help' : 'show help' }</a>
          <MetadataForm
            datasetRef={this.props.localDatasetRef}
            onChange={this.handleChange}
            onCancel={this.handleCancel}
            onSubmit={this.handleSave}
            showHelpText={showHelp}
          />
          <br />
        </div>
      )
    }
  }
}

MetadataEditor.propTypes = {
  path: PropTypes.string.isRequired,
  datasetRef: DatasetRefProps,
  localDatasetRef: DatasetRefProps,
  newDataset: PropTypes.func.isRequired,
  loadDataset: PropTypes.func.isRequired,
  updateDataset: PropTypes.func.isRequired,
  saveDataset: PropTypes.func.isRequired,
  cancelDatasetEdit: PropTypes.func.isRequired

}

MetadataEditor.defaultProps = {
}
