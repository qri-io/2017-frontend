/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../../propTypes/datasetRefProps'

import Base from '../Base'
import DatasetHeader from './DatasetHeader'
import DatasetRouter from './DatasetRouter'
import DeleteDataset from './DeleteDataset'
import RenameDataset from './RenameDataset'
import Spinner from '../chrome/Spinner'
import history from '../../history'

const DELETE_DATASET_MODAL = 'DELETE_DATASET_MODAL'
const RENAME_DATASET_MODAL = 'RENAME_DATASET_MODAL'

export default class Dataset extends Base {
  constructor (props) {
    super(props)

    this.state = {
      publishing: false,
      fetchError: false
    };

    [
      'handleDownloadDataset',
      'handleDeleteDataset',
      'handleEditDataset',
      'handleGoBack',
      'handleAddDataset',
      'handleReload',
      'handleRenameDataset',
      'handleTogglePublish'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
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
      // this.props.loadDatasetByPath(path, peername, name, ['bodypath', 'structure.schema'])
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
    } else if (sessionProfile && !body) {
      this.props.loadDatasetBody(path, bodypath)
    } else if (!profile) {
      this.props.loadProfileByName(peername)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { peername, name, sessionProfile, bodypath, error } = this.props
    const { fetchError } = this.state

    if (peername !== nextProps.peername || name !== nextProps.name) {
      var err
      this.props.loadDatasetByName(nextProps.peername, nextProps.name)
        .then(action => {
          err = action.error
          this.props.loadRegistryDatasetByName(nextProps.peername, nextProps.name)
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
    } else if (this.props.path !== nextProps.path && (!nextProps.datasetRef || !nextProps.bodypath || !nextProps.schema)) {
      this.props.loadDatasetByPath(nextProps.path, nextProps.peername, nextProps.name)
        .then(action => {
          err = action.error
          this.props.loadRegistryDatasetByPath(nextProps.path, nextProps.peername, nextProps.name)
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
    } else if (sessionProfile && !error && nextProps.bodypath && (bodypath !== nextProps.bodypath || (!nextProps.body && !nextProps.loadingBody))) {
      this.props.loadDatasetBody(nextProps.path, nextProps.bodypath)
    } else if (this.props.peername !== nextProps.peername) {
      this.props.loadProfileByName(peername)
    }
  }

  handleReload () {
    const { path, bodypath } = this.props
    this.props.loadDatasetBody(path, bodypath)
  }

  handleDownloadDataset () {
    const { peername, name, path } = this.props
    var exportPath = `${__BUILD__.API_URL}/export/${peername}/${name}`
    if (path && path !== '/') {
      exportPath += `/at${path}`
    }
    return exportPath
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

  template (css) {
    const {
      datasetRef,
      profile,
      peername,
      name,
      sessionProfile,
      match,
      noBody,
      body,
      layoutMain,
      error,
      loadDatasetBody,
      loadingBody,
      transfering,
      location,
      isLatestDataset,
      isLocal,
      fromRegistry,
      isInNamespace,
      registryVersion } = this.props

    const { publishing, fetchError } = this.state

    if (fetchError) {
      return <div className={css('center')}><h4>Dataset not found</h4></div>
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
      <div className={css('wrap')} >
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
          body={body}
          noBody={noBody}
          error={error}
          datasetRef={datasetRef}
          reload={this.handleReload}
          loadDatasetBody={loadDatasetBody}
          sessionProfile={sessionProfile}
          dataset={dataset}
          location={location}
          path={match.path}
          layout={layout}
          peername={peername}
          name={name}
          transfering={transfering}
          loadingBody={loadingBody}
          registryVersion={registryVersion}

          isLocal={isLocal}
          fromRegistry={fromRegistry}
          isLatestDataset={isLatestDataset}
          isInNamespace={isInNamespace}

          onRename={this.handleRenameDataset}
          onRemove={this.handleDeleteDataset}
          onAdd={this.handleAddDataset}
          onEdit={this.handleEditDataset}
          onTogglePublish={this.handleTogglePublish}
          publishing={publishing}
          exportPath={this.handleDownloadDataset()}
        />
      </div>
    )
  }

  styles () {
    return {
      full: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      linkSm: {
        margin: '0 10px'
      },
      links: {
        margin: '30px 0'
      },
      wrap: {
        display: 'flex',
        flexDirection: 'column'
      },
      center: {
        width: 300,
        height: 300,
        margin: '10em auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        textAlign: 'center'
      }
    }
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
