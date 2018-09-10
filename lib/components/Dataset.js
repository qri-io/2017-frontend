/* globals __BUILD__, confirm */
import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'

import Base from './Base'

import DatasetHeader from './DatasetHeader'
import NavLinks from './NavLinks'
import Structure from './Structure'
import Meta from './Meta'
import TransformContainer from '../containers/Transform'
import Commit from './Commit'
import Body from './Body'
import VizContainer from '../containers/Viz'
import CommitsContainer from '../containers/Commits'

import Spinner from './Spinner'
import DatasetSummary from './DatasetSummary'

import Render from './Render'

// DATASET_DEBUG = 1 will print the if statements and functions run in componentWillMount and componentWillRecieveProps
// DATASET_DEBUG = 2 will print the above and also the props, or the props and nextProps, in the componentWillMount and componentWillRecieveProps
// DATASET_DEBUG >= 0 will remove any logging
const DATASET_DEBUG = -1

export default class Dataset extends Base {
  constructor (props) {
    super(props);

    [
      'handleDownloadDataset',
      'handleDeleteDataset',
      'handleGoBack',
      'handleAddDataset',
      'handleReload',
      'renderDatasetLinks'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (DATASET_DEBUG >= 1) { console.log('componentWillMount') }
    if (DATASET_DEBUG >= 2) {
      console.log('this.props:')
      console.log(this.props)
    }

    const { peername, name, datasetRef, path, body, bodypath, sessionProfile, schema } = this.props
    if (!path) {
      if (DATASET_DEBUG >= 1) { console.log('!path: \nabout to loadDatasetByName') }
      this.props.loadDatasetByName(peername, name)
    } else if (!datasetRef || !bodypath || !schema) {
      if (DATASET_DEBUG >= 1) { console.log('!datasetRef || !bodypath || !schema: \nabout to loadDatasetByPath') }
      this.props.loadDatasetByPath(path, peername, name, ['bodypath', 'structure.schema'])
    } else if (sessionProfile && !body) {
      if (DATASET_DEBUG >= 1) { console.log('sessionProfile && !body: \nabout to loadDatasetBody') }
      this.props.loadDatasetBody(path, bodypath)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (DATASET_DEBUG >= 1) { console.log('componentWillReceiveProps') }
    if (DATASET_DEBUG >= 2) {
    }
    const { peername, name, sessionProfile, bodypath, viewMode } = this.props
    if (!nextProps.path || peername !== nextProps.peername || name !== nextProps.name) {
      if (DATASET_DEBUG >= 1) { console.log('!nextProps.path || peername !== nextProps.peername || name !== nextProps.name: \n about to loadDatasetByName') }
      this.props.loadDatasetByName(nextProps.peername, nextProps.name)
    } else if (!nextProps.datasetRef || !nextProps.bodypath || !nextProps.schema) {
      if (DATASET_DEBUG >= 1) { console.log('!nextProps.datasetRef || !nextProps.bodypath || !nextProps.schema: \nabout to loadDatasetByPath') }
      this.props.loadDatasetByPath(nextProps.path, ['bodypath', 'structure.schema'])
    } else if (sessionProfile && (bodypath !== nextProps.bodypath || (!nextProps.body && !nextProps.loading))) {
      if (DATASET_DEBUG >= 1) { console.log('sessionProfile && nextProps.bodypath !== bodypath: \nabout to loadDatasetBody') }
      this.props.loadDatasetBody(nextProps.path, nextProps.bodypath)
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

  renderDatasetLinks (css, url, linkList) {
    return (
      <div className={css('links')}>
        <NavLinks url={url} linkList={linkList} sm />
      </div>
    )
  }

  template (css) {
    const {
      datasetRef,
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

    const datasetLinks = [
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
    return (
      <div className={css('wrap')} >
        <DatasetHeader
          url={match.url}
          datasetRef={datasetRef}
          // only allow dataset removal if !peer and is latest dataset
          onClickDelete={!peer && isLatestDataset ? this.handleDeleteDataset() : undefined}
          // only export if not peer
          exportPath={!peer ? this.handleDownloadDataset() : undefined}
          onGoBack={this.handleGoBack}
          // only add if peer
          onClickAdd={peer ? this.handleAddDataset() : undefined}
          peer={peer}
          isLatestDataset={isLatestDataset}
          sessionProfile={sessionProfile}
          peername={peername}
          name={name}
          transfering={transfering}
        />
        <div className={css('switch')} >
          <Switch>
            {/*  Route to dataset summary */}
            <Route
              path={`${match.path}/summary`}
              render={props => (
                <div className={`datasetContent`}>
                  {this.renderDatasetLinks(css, match.url, datasetLinks)}
                  <DatasetSummary {...props} meta={meta} structure={structure} />
                </div>
              )}
            />
            {/*  Route to meta */}
            <Route
              path={`${match.path}/meta`}
              render={props => (
                <div className='datasetContent'>
                  {this.renderDatasetLinks(css, match.url, datasetLinks)}
                  <Meta {...props} meta={meta} />
                </div>
              )}
            />
            {/*  Route to structure */}
            <Route
              path={`${match.path}/structure`}
              render={props => (
                <div className='datasetContent'>
                  {this.renderDatasetLinks(css, match.url, datasetLinks)}
                  <Structure {...props} structure={structure} />
                </div>
              )}
            />
            {/*  Route to changes */}
            <Route
              path={`${match.path}/changes`}
              render={props => (
                <div className='datasetContent'>
                  <CommitsContainer {...props}
                    peername={peername}
                    name={name}
                    currentID={path} />
                </div>
              )}
            />
            {/*  Route to Render */}
            <Route
              path={`${match.path}/render`}
              render={props => (
                <Render {...props} peername={peername} name={name} path={path} />
              )}
            />
            {/*  Default to body, note: component not wrapped in datasetcontent div */}
            <Route
              path={`${match.path}/body`}
              render={props => (
                <Body {...props}
                  body={body}
                  noBody={noBody}
                  error={error}
                  datasetRef={datasetRef}
                  onClick={this.handleReload}
                  onSetLoadingBody={loadDatasetBody}
                  layout={layoutMain}
                  sessionProfile={sessionProfile} />
              )}
            />
            {/*  Route to Commit */}
            <Route
              path={`${match.path}/commit`}
              render={props => (
                <div className='datasetContent'>
                  {this.renderDatasetLinks(css, match.url, datasetLinks)}
                  <Commit {...props} commit={commit} />
                </div>
              )}
            />
            {/*  Route to Viz */}
            <Route
              path={`${match.path}/viz`}
              render={props => (
                <div className='datasetContent'>
                  {this.renderDatasetLinks(css, match.url, datasetLinks)}
                  <VizContainer {...props} dataset={dataset} />
                </div>
              )}
            />
            {/*  Route to Transform */}
            <Route
              path={`${match.path}/transform`}
              render={props => (
                <div className='datasetContent'>
                  {this.renderDatasetLinks(css, match.url, datasetLinks)}
                  <TransformContainer {...props} dataset={dataset} />
                </div>
              )}
            />
            {/*  Default to dataset summary */}
            <Route
              path={`${match.path}`}
              render={props => (
                <div className='datasetContent'>
                  {this.renderDatasetLinks(css, match.url, datasetLinks)}
                  <DatasetSummary {...props} meta={meta} structure={structure} />
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    )
  }

  styles () {
    return {
      switch: {
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
