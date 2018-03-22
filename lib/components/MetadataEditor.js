import React from 'react'
import PropTypes from 'prop-types'

import MetadataForm from './form/MetadataForm'
import Spinner from './Spinner'
import PageHeader from './PageHeader'
import SaveMetadataForm from './form/SaveMetadataForm'
import Base from './Base'

import DatasetRefProps from '../propTypes/datasetRefProps'

const ADD_SAVE_METADATA_MODAL = 'ADD_SAVE_METADATA_MODAL'

export default class MetadataEditor extends Base {
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
      'handleClickShowHelp',
      'handleClickHideHelp',
      'handleGoBack',
      'handleSaveCallback',
      'handleShowModal'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { path, localDatasetRef, datasetRef } = this.props
    if (!datasetRef) {
      this.props.loadDatasetByPath(path)
    }
    if (!localDatasetRef && datasetRef) {
      this.props.newDataset(datasetRef)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { localDatasetRef, datasetRef } = nextProps
    if (!localDatasetRef && datasetRef) {
      nextProps.newDataset(datasetRef)
    }
    if (localDatasetRef && datasetRef) {
      this.setState({ loading: false })
    }
  }

  handleChange (name, value) {
    const { dataset } = this.props.localDatasetRef
    const updatedMeta = dataset.meta && typeof dataset.meta === 'object' ? Object.assign(dataset.meta, {[name]: value}) : {[name]: value}
    const updatedDataset = Object.assign(dataset, {meta: updatedMeta})
    const change = Object.assign(this.props.localDatasetRef, { dataset: updatedDataset })
    this.props.updateDataset(change)
  }

  handleCancel () {
    const { localDatasetRef } = this.props
    this.props.goBack()
    this.props.cancelDatasetEdit(localDatasetRef.path)
  }

  handleSaveCallback () {
    const { localDatasetRef } = this.props
    this.props.hideModal()
    this.props.cancelDatasetEdit(localDatasetRef.path)
  }

  handleShowModal (e) {
    const data = {
      localDatasetRef: this.props.localDatasetRef,
      onSave: this.handleSave,
      onCancel: this.props.hideModal
    }
    this.props.showModal(ADD_SAVE_METADATA_MODAL, this, data, true, true)
  }

  modal (name, data = {}) {
    switch (name) {
      case ADD_SAVE_METADATA_MODAL:
        return <SaveMetadataForm localDatasetRef={data.localDatasetRef} onSave={data.onSave} onCancel={data.onCancel} />
      default:
        return undefined
    }
  }
  handleSave (localDatasetRef, description, callback) {
    this.props.saveMetaDataset(localDatasetRef, description, this.handleSaveCallback)
  }

  handleClickShowHelp () {
    this.setState({ showHelp: true })
  }

  handleClickHideHelp () {
    this.setState({ showHelp: false })
  }

  handleGoBack () {
    this.props.goBack()
  }

  template (css) {
    if (this.state.loading) {
      return <Spinner />
    } else {
      const { showHelp } = this.state
      return (
        <div className={`metadata editor ${css('wrap')}`}>
          <PageHeader onGoBack={this.handleGoBack} onClickHideHelp={showHelp ? this.handleClickHideHelp : undefined} onClickShowHelp={showHelp ? undefined : this.handleClickShowHelp} />
          <MetadataForm
            datasetRef={this.props.localDatasetRef}
            onChange={this.handleChange}
            onCancel={this.handleCancel}
            onSubmit={this.handleShowModal}
            showHelpText={showHelp}
          />
          <br />
        </div>
      )
    }
  }

  styles (props) {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      }
    }
  }
}

MetadataEditor.propTypes = {
  path: PropTypes.string.isRequired,
  datasetRef: DatasetRefProps,
  localDatasetRef: DatasetRefProps,
  newDataset: PropTypes.func.isRequired,
  loadDatasetByPath: PropTypes.func.isRequired,
  updateDataset: PropTypes.func.isRequired,
  saveMetaDataset: PropTypes.func.isRequired,
  cancelDatasetEdit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired

}

MetadataEditor.defaultProps = {
}
