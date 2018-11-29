/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../../propTypes/datasetRefProps'

import Base from '../Base'
import DatasetHeader from './DatasetHeader'
import DatasetRouter from './DatasetRouter'
import DeleteDataset from './DeleteDataset'
import Spinner from '../chrome/Spinner'
import history from '../../history'

// DATASET_DEBUG = 1 will print the if statements and functions run in componentWillMount and componentWillRecieveProps
// DATASET_DEBUG = 2 will print the above and also the props, or the props and nextProps, in the componentWillMount and componentWillRecieveProps
// DATASET_DEBUG >= 0 will remove any logging
const DATASET_DEBUG = 0
const DELETE_DATASET_MODAL = 'DELETE_DATASET_MODAL'

export default class Dataset extends Base {
  constructor (props) {
    super(props);

    [
      'handleDownloadDataset',
      'handleDeleteDataset',
      'handleEditDataset',
      'handleGoBack',
      'handleAddDataset',
      'handleReload'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (DATASET_DEBUG >= 1) { console.log('componentWillMount') }
    if (DATASET_DEBUG >= 2) {
      console.log('this.props:')
      console.log(this.props)
    }

    const { peername, name, datasetRef, path, body, bodypath, sessionProfile, schema, profile, fromRegistry } = this.props
    if (!path) {
      if (DATASET_DEBUG >= 1) { console.log('!path: \nabout to loadDatasetByName') }
      this.props.loadDatasetByName(peername, name)
    } else if (!datasetRef || (!fromRegistry && !bodypath) || !schema) {
      if (DATASET_DEBUG >= 1) { console.log('!datasetRef || !bodypath || !schema: \nabout to loadDatasetByPath') }
      // this.props.loadDatasetByPath(path, peername, name, ['bodypath', 'structure.schema'])
      this.props.loadDatasetByPath(path, peername, name)
    } else if (sessionProfile && !fromRegistry && !body) {
      if (DATASET_DEBUG >= 1) { console.log('sessionProfile && !body: \nabout to loadDatasetBody') }
      this.props.loadDatasetBody(path, bodypath)
    } else if (!profile) {
      if (DATASET_DEBUG >= 1) { console.log('!profile: \nabout to loadProfileByName') }
      this.props.loadProfileByName(peername)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (DATASET_DEBUG >= 1) { console.log('componentWillReceiveProps') }
    if (DATASET_DEBUG >= 2) {
      console.log('this.props:')
      console.log(this.props)
      console.log('nextProps:')
      console.log(nextProps)
    }
    const { peername, name, sessionProfile, bodypath, fromRegistry } = this.props
    if (peername !== nextProps.peername || name !== nextProps.name) {
      if (DATASET_DEBUG >= 1) { console.log('!nextProps.path || peername !== nextProps.peername || name !== nextProps.name: \n about to loadDatasetByName') }
      this.props.loadDatasetByName(nextProps.peername, nextProps.name)
    } else if (this.props.path !== nextProps.path && (!nextProps.datasetRef || (!nextProps.fromRegistry && !nextProps.bodypath) || !nextProps.schema)) {
      if (DATASET_DEBUG >= 1) { console.log('!nextProps.datasetRef || !nextProps.bodypath || !nextProps.schema: \nabout to loadDatasetByPath') }
      this.props.loadDatasetByPath(nextProps.path, ['bodypath', 'structure.schema'])
    } else if (sessionProfile && !fromRegistry && nextProps.bodypath && (bodypath !== nextProps.bodypath || (!nextProps.body && !nextProps.loadingBody))) {
      if (DATASET_DEBUG >= 1) { console.log('sessionProfile && nextProps.bodypath !== bodypath: \nabout to loadDatasetBody') }
      this.props.loadDatasetBody(nextProps.path, nextProps.bodypath)
    } else if (this.props.peername !== nextProps.peername) {
      if (DATASET_DEBUG >= 1) { console.log('!profile: \nabout to loadProfileByName') }
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
      default:
        return undefined
    }
  }

  handleDeleteDataset () {
    this.props.showModal(DELETE_DATASET_MODAL, this, this.props.datasetRef, true, false)
  }

  handleGoBack () {
    this.props.goBack()
  }

  handleAddDataset () {
    const { peername, name, sessionProfile, datasetRef } = this.props
    const { path } = datasetRef
    return () => {
      this.props.addDataset(peername, name, path).then(() => {
        this.props.loadDatasets(sessionProfile)
      })
    }
  }

  template (css) {
    const {
      datasetRef,
      profile,
      isLatestDataset,
      peername,
      peer,
      name,
      sessionProfile,
      sessionProfileHandle,
      match,
      noBody,
      body,
      layoutMain,
      error,
      loadDatasetBody,
      transfering,
      loadingBody,
      togglePublishDataset,
      location,
      fromRegistry } = this.props

    if (!datasetRef) {
      return <Spinner />
    }

    if (datasetRef && datasetRef.dataset && datasetRef.dataset.structure && typeof datasetRef.dataset.structure === 'string') {
      return (<Spinner />)
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
          // only show the history if either the peername is the sessionProfileHandle, so the dataset is not from the registry
          fromRegistry={fromRegistry}
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
          // TODO: make sure buttons are getting the
          // correct functions and that they are
          // appearing during the right combinations of
          // state
          onRemove={!peer && isLatestDataset ? this.handleDeleteDataset : undefined}
          onAdd={peer ? this.handleAddDataset() : undefined}
          onEdit={isLatestDataset && !fromRegistry && this.handleEditDataset}
          onTogglePublish={sessionProfileHandle === peername && (() => { togglePublishDataset(peername, name, datasetRef.published) })}
          exportPath={!peer && this.handleDownloadDataset()}
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
