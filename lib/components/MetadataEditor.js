import React from 'react'
import PropTypes from 'prop-types'

import MetadataForm from './form/MetadataForm'
import Spinner from './Spinner'
import PageHeader from './PageHeader'
import SaveMetadataForm from './form/SaveMetadataForm'
import Base from './Base'
import ReadOnly from './ReadOnly'

import DatasetRefProps from '../propTypes/datasetRefProps'
import { resetMessage } from '../actions/app'
import { DATASET_SAVE_SUCCESS } from '../constants/dataset'

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
      'handleShowModal',
      'handlePrepareDataset'
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
    if (localDatasetRef && !(localDatasetRef.dataset && localDatasetRef.dataset.meta)) {
      const dataset = localDatasetRef.dataset ? localDatasetRef.dataset : {}
      const updatedDataset = Object.assign(dataset, {meta: {}})
      const change = Object.assign(localDatasetRef, { dataset: updatedDataset })
      this.props.updateDataset(change)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { localDatasetRef, datasetRef } = nextProps
    if (!localDatasetRef && datasetRef) {
      nextProps.newDataset(datasetRef)
    }
    if (localDatasetRef && !(localDatasetRef.dataset && localDatasetRef.dataset.meta)) {
      const dataset = localDatasetRef.dataset ? localDatasetRef.dataset : {}
      const updatedDataset = Object.assign(dataset, {meta: {}})
      const change = Object.assign(localDatasetRef, { dataset: updatedDataset })
      this.props.updateDataset(change)
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

  handlePrepareDataset (localDatasetRef, title, message) {
    const { dataset } = localDatasetRef
    dataset.commit = {title, message}
    dataset.dataPath = ''
    return localDatasetRef
  }

  handleSave (localDatasetRef, title, message) {
    this.props.saveDataset(this.handlePrepareDataset(localDatasetRef, title, message)).then(action => {
      const { localDatasetRef, datasetRef } = this.props
      setTimeout(() => resetMessage(), 5000)
      this.props.hideModal()
      this.props.clearPaginationIds('popularDatasets', this.props.sessionProfile)
      this.props.loadDatasets(this.props.sessionProfile)
      this.props.cancelDatasetEdit(localDatasetRef.path)
      if (action.type === DATASET_SAVE_SUCCESS) {
        this.props.push(`/${datasetRef.peername}/${datasetRef.name}`)
      }
    })
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
    if (!this.props.sessionProfile) {
      return <ReadOnly />
    }
    if (this.state.loading) {
      return <Spinner />
    } else {
      const { showHelp } = this.state
      return (
        <div className={`metadata editor ${css('wrap')}`}>
          <PageHeader onGoBack={this.handleGoBack} onClickHideHelp={showHelp ? this.handleClickHideHelp : undefined} onClickShowHelp={showHelp ? undefined : this.handleClickShowHelp} />
          <h1 className={css('head')}>Metadata Editor</h1>
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

  styles () {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      },
      head: {
        marginTop: 20
      }
    }
  }
}

MetadataEditor.propTypes = {
  path: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  datasetRef: DatasetRefProps,
  localDatasetRef: DatasetRefProps,
  newDataset: PropTypes.func.isRequired,
  loadDatasetByPath: PropTypes.func.isRequired,
  updateDataset: PropTypes.func.isRequired,
  saveDataset: PropTypes.func.isRequired,
  cancelDatasetEdit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired

}

MetadataEditor.defaultProps = {
}
