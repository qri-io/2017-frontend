import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../../propTypes/datasetRefProps'
import DatasetHeader from './DatasetHeader'
import DatasetRouter from './DatasetRouter'
import DeleteDataset from './DeleteDataset'
import ExportDataset from './ExportDataset'
import RenameDataset from './RenameDataset'
import Spinner from '../chrome/Spinner'
import history from '../../history'

import { DATASET_UPDATE_SUCCESS } from '../../constants/dataset'
const DELETE_DATASET_MODAL = 'DELETE_DATASET_MODAL'
const RENAME_DATASET_MODAL = 'RENAME_DATASET_MODAL'
const EXPORT_DATASET_MODAL = 'EXPORT_DATASET_MODAL'

export default class Dataset extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      publishing: false,
      fetchError: false
    };

    [
      'handleDeleteDataset',
      'handleEditDataset',
      'handleGoBack',
      'handleAddDataset',
      'handleReload',
      'handleRenameDataset',
      'handleTogglePublish',
      'handleUpdateDataset',
      'handleExportDataset'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    const { peername, name, datasetRef, path, body, bodypath, sessionProfile, schema, profile } = this.props
    const { fetchError } = this.state

    if (!path) {
      var err
      this.props.loadDatasetByName(peername, name)
        .then(action => {
          err = action.error
          this.props.loadRegistryDatasetByName(peername, name)
            .then(action => {
              // if there was an error loading the dataset by name locally
              // and an error loading the dataset via the registry
              // let's show the user an error message
              if (!fetchError && err && action.error) {
                this.setState({ fetchError: true })
              } else if (fetchError) {
                this.setState({ fetchError: false })
              }
            })
        })
    } else if (!datasetRef || !bodypath || !schema) {
      // TODO (b5) - this is causing crashes when clicking to a dataset from the "network" tab
      // we should figure out why and fix
      // this.props.loadDatasetByPath(path, peername, name, ['bodypath', 'structure.schema'])
      // this.props.loadDatasetByPath(path, peername, name)
      //   .then(action => {
      //     err = action.error
      //     this.props.loadRegistryDatasetByPath(path, peername, name)
      //       .then(action => {
      //         // if there was an error loading the dataset by path locally
      //         // and an error loading the dataset via the registry
      //         // let's show the user an error message
      //         if (!fetchError && err && action.error) {
      //           this.setState({ fetchError: true })
      //         } else if (fetchError) {
      //           this.setState({ fetchError: false })
      //         }
      //       })
      //   })
    } else if (sessionProfile && !body) {
      this.props.loadBody(path, bodypath)
    } else if (!profile) {
      this.props.loadProfileByName(peername)
    }
  }

  componentWillUnmount () {
    this.props.clearBody()
  }

  componentDidUpdate (prevProps) {
    const { peername, name, path, bodypath, schema, body, bodyLoading, datasetRef } = this.props
    const { fetchError } = this.state

    if (prevProps.peername !== peername || prevProps.name !== name) {
      var err
      this.props.loadDatasetByName(peername, name)
        .then(action => {
          err = action.error
          this.props.loadRegistryDatasetByName(peername, name)
            .then(action => {
              // if there was an error loading the dataset by name locally
              // and an error loading the dataset via the registry
              // let's show the user an error message
              if (!fetchError && err && action.error) {
                this.setState({ fetchError: true })
              } else if (fetchError) {
                this.setState({ fetchError: false })
              }
            })
        })
    } else if (prevProps.path !== path && (!datasetRef || !bodypath || !schema)) {
      this.props.loadDatasetByPath(path, peername, name)
        .then(action => {
          err = action.error
          this.props.loadRegistryDatasetByPath(path, peername, name)
            .then(action => {
              // if there was an error loading the dataset by path locally
              // and an error loading the dataset via the registry
              // let's show the user an error message
              if (!fetchError && err && action.error) {
                this.setState({ fetchError: true })
              } else if (fetchError) {
                this.setState({ fetchError: false })
              }
            })
        })
    } else if (prevProps.sessionProfile && !prevProps.error && bodypath && (prevProps.bodypath !== bodypath || (!body && !bodyLoading))) {
      this.props.loadBody(path, bodypath)
    } else if (prevProps.peername !== peername) {
      this.props.loadProfileByName(peername)
    }
  }

  handleReload () {
    const { path, bodypath } = this.props
    this.props.loadBody(path, bodypath)
  }

  handleEditDataset () {
    this.props.editDataset(this.props.path).then(() => {
      history.push('/edit')
    })
  }

  modal (name, data = {}) {
    switch (name) {
      case DELETE_DATASET_MODAL:
        return (
          <DeleteDataset
            datasetRef={data}
            onDelete={this.props.deleteDataset}
            onCancel={this.props.hideModal}
            history={this.props.history}
          />
        )
      case RENAME_DATASET_MODAL:
        return (
          <RenameDataset
            datasetRef={data}
            onRename={this.props.renameDataset}
            onCancel={this.props.hideModal}
            history={this.props.history}
          />
        )
      case EXPORT_DATASET_MODAL:
        return (
          <ExportDataset
            datasetRef={data}
            onCancel={this.props.hideModal}
          />
        )
      default:
        return undefined
    }
  }

  handleDeleteDataset () {
    this.props.showModal(DELETE_DATASET_MODAL, this, this.props.datasetRef, true, false)
  }

  handleRenameDataset () {
    this.props.showModal(RENAME_DATASET_MODAL, this, this.props.datasetRef, true, false)
  }

  handleExportDataset () {
    this.props.showModal(EXPORT_DATASET_MODAL, this, this.props.datasetRef, true, false)
  }

  handleGoBack () {
    this.props.goBack()
  }

  handleAddDataset () {
    const { peername, name, sessionProfile, datasetRef } = this.props
    const { path } = datasetRef
    const profileID = datasetRef && datasetRef.dataset && datasetRef.dataset.commit && datasetRef.dataset.commit.author && datasetRef.dataset.commit.author.id
    this.props.addDataset(peername, name, profileID, path).then(() => {
      this.props.loadDatasets(sessionProfile)
    })
  }

  handleTogglePublish () {
    const { peername, name, datasetRef } = this.props
    this.setState(
      { publishing: true },
      () => {
        this.props.togglePublishDataset(peername, name, datasetRef.path, datasetRef.published).then(() => {
          this.setState({ publishing: false })
        })
      }
    )
  }

  handleUpdateDataset () {
    const { peername, name } = this.props
    this.setState(
      { updating: true },
      () => {
        this.props.updateDataset(peername, name)
          .then((action) => {
            this.setState({ updating: false })
            if (action.type === DATASET_UPDATE_SUCCESS) {
              const hash = action.response.result.data.split('/').pop()
              history.replace(hash)
            }
          })
      })
  }

  render () {
    const {
      datasetRef,
      profile,
      peername,
      name,
      sessionProfile,
      match,
      layoutMain,
      transfering,
      location,
      isLatestDataset,
      isLocal,
      fromRegistry,
      isInNamespace,
      registryVersion,

      body,
      bodypath,
      noBody,
      bodyError,
      bodyLength,
      bodyLoading,
      bodyFetchedAll,
      loadBody } = this.props

    const { publishing, updating, fetchError } = this.state

    if (fetchError) {
      return <div className='dataset-center'><h4>Dataset not found</h4></div>
    }

    if (!datasetRef) {
      return <Spinner large />
    }

    if (datasetRef && datasetRef.dataset && datasetRef.dataset.structure && typeof datasetRef.dataset.structure === 'string') {
      return (<Spinner large />)
    }

    // consts being passed to DatasetHeader or Routers
    const dataset = datasetRef ? datasetRef.dataset : undefined

    const meta = dataset ? dataset.meta : undefined
    const structure = dataset ? dataset.structure : undefined
    const commit = dataset ? dataset.commit : undefined

    // adjust layout to include dataset header size:
    var layout = Object.assign({}, layoutMain, { height: layoutMain.height - 140 })

    return (
      <div className='dataset-wrap' >
        <DatasetHeader
          url={match.url}
          datasetRef={datasetRef}
          isLatestDataset={isLatestDataset}
          sessionProfile={sessionProfile}
          peername={peername}
          name={name}
          isLocal={isLocal}
          fromRegistry={fromRegistry}
          registryVersion={registryVersion}
        />
        <DatasetRouter
          meta={meta}
          structure={structure}
          commit={commit}
          url={match.url}
          profile={profile}
          datasetRef={datasetRef}
          reload={this.handleReload}
          sessionProfile={sessionProfile}
          dataset={dataset}
          location={location}
          path={match.path}
          layout={layout}
          peername={peername}
          name={name}
          transfering={transfering}
          registryVersion={registryVersion}

          body={body}
          bodypath={bodypath}
          noBody={noBody}
          bodyError={bodyError}
          bodyFetchedAll={bodyFetchedAll}
          bodyLoading={bodyLoading}
          bodyLength={bodyLength}
          loadBody={loadBody}

          isLocal={isLocal}
          fromRegistry={fromRegistry}
          isLatestDataset={isLatestDataset}
          isInNamespace={isInNamespace}

          onRename={this.handleRenameDataset}
          onRemove={this.handleDeleteDataset}
          onAdd={this.handleAddDataset}
          onEdit={this.handleEditDataset}
          onUpdate={this.handleUpdateDataset}
          updating={updating}
          onTogglePublish={this.handleTogglePublish}
          publishing={publishing}
          onExport={this.handleExportDataset}
        />
      </div>
    )
  }
}

Dataset.propTypes = {
  // the dataset model to display
  datasetRef: DatasetRefProps,

  // results (if any)
  results: PropTypes.object,
  path: PropTypes.string
  // goBack: PropTypes.func.isRequired
}

Dataset.defaultProps = {
}
