/* globals __BUILD__, confirm */
import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import DatasetRefProps from '../../propTypes/datasetRefProps'

import Base from '../Base'

import DatasetHeader from './DatasetHeader'
import Render from './Render'
import Export from './Export'
import DatasetRouter from './DatasetRouter'

import Spinner from '../Spinner'

// DATASET_DEBUG = 1 will print the if statements and functions run in componentWillMount and componentWillRecieveProps
// DATASET_DEBUG = 2 will print the above and also the props, or the props and nextProps, in the componentWillMount and componentWillRecieveProps
// DATASET_DEBUG >= 0 will remove any logging
const DATASET_DEBUG = 0

export default class Dataset extends Base {
  constructor (props) {
    super(props);

    [
      'handleDownloadDataset',
      'handleDeleteDataset',
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

    const { peername, name, datasetRef, path, body, bodypath, sessionProfile, schema, profile } = this.props
    if (!path) {
      if (DATASET_DEBUG >= 1) { console.log('!path: \nabout to loadDatasetByName') }
      this.props.loadDatasetByName(peername, name)
    } else if (!datasetRef || !bodypath || !schema) {
      if (DATASET_DEBUG >= 1) { console.log('!datasetRef || !bodypath || !schema: \nabout to loadDatasetByPath') }
      // this.props.loadDatasetByPath(path, peername, name, ['bodypath', 'structure.schema'])
      this.props.loadDatasetByPath(path, peername, name)
    } else if (sessionProfile && !body) {
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
    const { peername, name, sessionProfile, bodypath, viewMode } = this.props
    if (peername !== nextProps.peername || name !== nextProps.name) {
      if (DATASET_DEBUG >= 1) { console.log('!nextProps.path || peername !== nextProps.peername || name !== nextProps.name: \n about to loadDatasetByName') }
      this.props.loadDatasetByName(nextProps.peername, nextProps.name)
    } else if (this.props.path !== nextProps.path && (!nextProps.datasetRef || !nextProps.bodypath || !nextProps.schema)) {
      if (DATASET_DEBUG >= 1) { console.log('!nextProps.datasetRef || !nextProps.bodypath || !nextProps.schema: \nabout to loadDatasetByPath') }
      this.props.loadDatasetByPath(nextProps.path, ['bodypath', 'structure.schema'])
    } else if (sessionProfile && nextProps.bodypath && (bodypath !== nextProps.bodypath || (!nextProps.body && !nextProps.loading))) {
      if (DATASET_DEBUG >= 1) { console.log('sessionProfile && nextProps.bodypath !== bodypath: \nabout to loadDatasetBody') }
      this.props.loadDatasetBody(nextProps.path, nextProps.bodypath)
    } else if (this.props.peername !== nextProps.peername) {
      if (DATASET_DEBUG >= 1) { console.log('!profile: \nabout to loadProfileByName') }
      this.props.loadProfileByName(peername)
    }

    if (nextProps.viewMode === 'dataset' && viewMode === 'viz') {
      this.setState({ transitionViewModes: true })
      setTimeout(() => {
        this.setState({ transitionViewModes: false })
      }, 2500)
    }
  }

  handleReload () {
    const { path, bodypath } = this.props
    this.props.loadDatasetBody(path, bodypath)
  }

  handleDownloadDataset () {
    const { peername, name } = this.props
    return `${__BUILD__.API_URL}/export/${peername}/${name}`
  }

  handleDeleteDataset () {
    const { datasetRef } = this.props
    return () => {
      if (confirm('are you sure you want to remove this dataset from your qri node? (Note: if this dataset has been added by other peers, the data may still exist on the network)')) {
        this.props.deleteDataset(datasetRef, '/')
      }
    }
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
      match,
      noBody,
      body,
      layoutMain,
      error,
      loadDatasetBody,
      transfering } = this.props

    if (!datasetRef) {
      return <Spinner />
    }

    if (datasetRef && datasetRef.dataset && datasetRef.dataset.structure && typeof datasetRef.dataset.structure === 'string') {
      return (<Spinner />)
    }

    // consts being passed to DatasetHeader or Routers
    const dataset = datasetRef ? datasetRef.dataset : undefined
    const path = datasetRef ? datasetRef.path : undefined

    const meta = dataset ? dataset.meta : undefined
    const structure = dataset ? dataset.structure : undefined
    const commit = dataset ? dataset.commit : undefined

    // adjust layout to include dataset header size:
    var layout = Object.assign({}, layoutMain, { height: layoutMain.height - 140 })

    const datasetLinksAll = [
      {
        name: 'Overview',
        link: 'overview'
      },
      {
        name: 'Body',
        link: 'body'
      },
      {
        name: 'Meta',
        link: 'meta'
      },
      {
        name: 'Structure',
        link: 'structure'
      },
      {
        name: 'Commit',
        link: 'commit'
      },
      {
        name: 'Viz',
        link: 'viz'
      },
      {
        name: 'Transform',
        link: 'transform'
      }
    ]
    const keys = Object.keys(dataset)
    const datasetLinks = datasetLinksAll.filter(elem => elem.link === 'overview' || elem.link === 'body' || keys.includes(elem.link))

    return (
      <div className={css('wrap')} >
        <DatasetHeader
          url={match.url}
          datasetRef={datasetRef}
          // only allow dataset removal if !peer and is latest dataset
          onClickDelete={!peer && isLatestDataset ? this.handleDeleteDataset() : undefined}
          onGoBack={this.handleGoBack}
          // only add if peer
          onClickAdd={peer ? this.handleAddDataset() : undefined}
          isLatestDataset={isLatestDataset}
          sessionProfile={sessionProfile}
          peername={peername}
          name={name}
          transfering={transfering}
        />
        <div className={css('full')} >
          <Switch>
            {/*  Route to Render */}
            <Route
              path={`${match.path}/render`}
              render={props => (
                <Render {...props} peername={peername} name={name} path={path} layout={layout} />
              )}
            />
            {/*  Route to Export */}
            {/*  only allow exports of local datasets */}
            {!peer && <Route
              path={`${match.path}/export`}
              render={props => (
                <Export {...props} exportPath={this.handleDownloadDataset()} />
              )}
            />}
            {/*  Default to dataset summary */}
            <Route
              path={`${match.path}`}
              render={props => (
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
                  datasetLinks={datasetLinks}
                  path={match.path}
                  layout={layout}
                  peername={peername}
                  name={name}
                />
              )}
            />
          </Switch>
        </div>
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
