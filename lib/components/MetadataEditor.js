import React from 'react'
import PropTypes from 'prop-types'

import MetadataForm from './form/MetadataForm'
import Spinner from './Spinner'
import PageHeader from './PageHeader'
import Base from './Base'

import DatasetRefProps from '../propTypes/datasetRefProps'

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
      'handleGoBack'
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
    const { localDatasetRef, datasetRef } = nextProps
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
    const change = Object.assign(this.props.localDatasetRef, { dataset: updatedDataset })
    this.props.updateDataset(change)
  }

  handleCancel () {
    this.props.goBack()
    this.props.cancelDatasetEdit(this.props.path)
  }

  handleSave (localDatasetRef) {
    this.props.saveDataset(localDatasetRef)
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
            onSubmit={this.handleSave}
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
  loadDataset: PropTypes.func.isRequired,
  updateDataset: PropTypes.func.isRequired,
  saveDataset: PropTypes.func.isRequired,
  cancelDatasetEdit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired

}

MetadataEditor.defaultProps = {
}
