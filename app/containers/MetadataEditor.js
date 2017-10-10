import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import MetadataForm from '../components/form/MetadataForm'
import Spinner from '../components/Spinner'

import { newDataset, updateDataset, loadDataset, saveDataset, cancelDatasetEdit } from '../actions/dataset'
import { selectLocalDatasetById, selectDataset } from '../selectors/dataset'
import { selectDefaultKeyId } from '../selectors/keys'

import DatasetRefProps from '../propTypes/datasetRefProps'

class MetadataEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: !(this.props.datasetRef && this.props.localDatasetRef),
      showHelp: true
    };

    [
      'handleNew',
      'handleEdit',
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

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.sessionKeyId != this.props.sessionKeyId) {
  //     nextProps.loadMetadata(nextProps.sessionKeyId, this.props.subjectHash)
  //   }
  // }

  handleNew () {
    // this.props.newMetadata(this.props.sessionKeyId, this.props.subjectHash)
  }

  handleEdit () {
    // this.props.editMetadata(this.props.savedMetadata)
  }

  handleChange (name, value) {
    const { dataset } = this.props.localDatasetRef
    const updatedDataset = Object.assign(dataset, { [name]: value })
    const change = Object.assign(this.props.localDatasetRef, { dataset: updatedDataset})
    this.props.updateDataset(change)
  }

  handleCancel (path) {
    // this.props.cancelDatasetEdit(path)
  }

  handleSave (localDatasetRef) {
    this.props.saveDataset(localDatasetRef)
    // this.props.cancelDatasetEdit(localDatasetRef.path)
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

  // newMetadata: PropTypes.func.isRequired,
  // editMetadata: PropTypes.func.isRequired,
  // updateMetadata: PropTypes.func.isRequired,
  // cancelMetadataEdit: PropTypes.func.isRequired,
  // loadMetadata: PropTypes.func.isRequired,
  // saveMetadata: PropTypes.func
}

MetadataEditor.defaultProps = {
}

function mapStateToProps (state, ownProps) {
  const path = ownProps.path
  // const sessionKeyId = selectDefaultKeyId(state)
  return Object.assign({
    // sessionKeyId,
    datasetRef: selectDataset(state, path),
    localDatasetRef: selectLocalDatasetById(state, path)
  }, ownProps)
}

export default connect(mapStateToProps, {
  newDataset,
  loadDataset,
  updateDataset,
  saveDataset,
  cancelDatasetEdit
  // newMetadata,
  // editMetadata,
  // updateMetadata,
  // cancelMetadataEdit,
  // loadMetadata,
  // saveMetadata
})(MetadataEditor)
