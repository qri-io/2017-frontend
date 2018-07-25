/* globals __BUILD__, confirm */
import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'
import { defaultPalette } from '../propTypes/palette'

import Base from './Base'
import TabPanel from './TabPanel'
import DatasetHeader from './DatasetHeader'
import Structure from './Structure'
import Meta from './Meta'
// import Transform from './Transform'
import Body from './Body'
import CommitsContainer from '../containers/Commits'
import NameDataset from './NameDataset'
import BodyReadOnly from './BodyReadOnly'
import Spinner from './Spinner'

const RENAME_DATASET_MODAL = 'RENAME_DATASET_MODAL'

// DATASET_DEBUG = 1 will print the if statements and functions run in componentWillMount and componentWillRecieveProps
// DATASET_DEBUG = 2 will print the above and also the props, or the props and nextProps, in the componentWillMount and componentWillRecieveProps
// DATASET_DEBUG >= 0 will remove any logging
const DATASET_DEBUG = -1

export default class Dataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      transitionViewModes: false
    };

    [
      'handleDownloadDataset',
      'handleDeleteDataset',
      'handleGoBack',
      'handleAddDataset',
      'handleDescription',
      'handleReload',
      'changeTabIndex',
      'handleEditMetadata',
      'handleRenameDataset',
      'handleShowRenameModal',
      'renderStructure',
      'renderBody',
      'renderComingSoon',
      'renderTabPanel'
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
    const { peername, name, sessionProfile } = this.props
    return () => {
      this.props.addDataset(peername, name, '', '').then(() => {
        this.props.loadDatasets(sessionProfile)
      })
    }
  }

  changeTabIndex (index) {
    this.setState({ tabIndex: index })
  }

  handleEditMetadata () {
    const { peername, name, datasetRef } = this.props
    const { path } = datasetRef
    return () => this.props.history.push(`/${peername}/${name}/at${path}/meta/edit`)
  }

  handleRenameDataset (datasetRef, newName, callback) {
    this.props.renameDataset(datasetRef, newName).then(action => callback(action))
  }

  handleShowRenameModal () {
    const { datasetRef } = this.props
    return () => {
      const data = {
        datasetRef,
        handleNameDataset: this.handleRenameDataset,
        hideModal: this.props.hideModal
      }
      this.props.showModal(RENAME_DATASET_MODAL, this, data, false)
    }
  }

  handleDescription () {
    const { datasetRef } = this.props
    const { dataset } = datasetRef
    if (!dataset || !dataset.description) {
      return 'No description given for this dataset'
    } else {
      return dataset.description
    }
  }

  renderStructure (css, dataset) {
    if (dataset.structure && dataset.structure.schema) {
      return (<div className={css('overflow')} ><Structure structure={dataset.structure} /></div>)
    } else {
      return (<p>This dataset currently has no specified structure</p>)
    }
  }

  renderMeta (css) {
    const { datasetRef, sessionProfileName, peername, isLatestDataset, peer } = this.props
    const { dataset } = datasetRef
    return (<div className={css('overflow')} ><Meta meta={dataset.meta} onClickEdit={(!peer &&
       isLatestDataset && sessionProfileName === peername) ? this.handleEditMetadata() : undefined} structure={dataset.structure} /></div>)
  }

  modal (name, data = {}) {
    switch (name) {
      case RENAME_DATASET_MODAL:
        return <NameDataset data={data} />
      default:
        return undefined
    }
  }

  renderBody (css) {
    const { body, datasetRef, sessionProfile, layoutMain } = this.props
    if (sessionProfile) {
      return (
        <div className={css('overflow')} >
          <Body
            body={body}
            datasetRef={datasetRef}
            noBody={this.props.noBody}
            error={this.props.error}
            onClick={this.handleReload}
            onSetLoadingBody={this.props.loadDatasetBody}
            layout={layoutMain}
          />
        </div>
      )
    } else {
      return (
        <div className={css('overflow')} >
          <BodyReadOnly />
        </div>
      )
    }
  }

  renderChanges (peername, name, path) {
    return (
      <CommitsContainer peername={peername} name={name} currentID={path} />
    )
  }

  renderViz (peername, name) {
    return (
      <iframe style={{width: '100%', height: '100%', border: 'none'}} src={`http://localhost:2503/render/${peername}/${name}`} />)
  }

  renderComingSoon (css) {
    return (
      <div className={css('comingSoonWrap')}>
        <p>Coming soon!</p>
      </div>
    )
  }

  renderTabPanel (css) {
    const { datasetRef, peername, name, peer } = this.props
    const { path, dataset } = datasetRef
    const { tabIndex, expanded } = this.state
    if (peer) {
      return (
        <TabPanel
          index={tabIndex}
          labels={['Meta', 'Body', 'Structure', 'Viz']}
          onSelectPanel={this.changeTabIndex}
          expanded={expanded === 'tabPanel'}
          clearBackground
          components={[
            this.renderMeta(css),
            this.renderBody(css),
            this.renderStructure(css, dataset),
            this.renderViz(peername, name)
          ]}
        />
      )
    }
    return (
      <TabPanel
        index={tabIndex}
        labels={['Meta', 'Body', 'Structure', 'Changes', 'Viz']}
        onSelectPanel={this.changeTabIndex}
        expanded={expanded === 'tabPanel'}
        clearBackground
        components={[
          this.renderMeta(css),
          this.renderBody(css),
          this.renderStructure(css, dataset),
          this.renderChanges(peername, name, path),
          this.renderViz(peername, name)
        ]}
      />
    )
  }

  renderDataset (css) {
    const { datasetRef, isLatestDataset, peername, peer, sessionProfileName, name } = this.props

    return (
      <div className={css('content')}>
        <div className={css('topPanel')} >
          <DatasetHeader
            datasetRef={datasetRef}
            // only allow dataset removal if !peer and is latest dataset
            onClickDelete={!peer && isLatestDataset ? this.handleDeleteDataset() : undefined}
            // only export if not peer
            exportPath={!peer ? this.handleDownloadDataset() : undefined}
            onGoBack={this.handleGoBack}
            // only add if peer
            onClickAdd={peer ? this.handleAddDataset() : undefined}
            // onClickRename={this.handleShowRenameModal()}
            // only rename if peername is sessionProfileName, not peer, and is latest dataset
            onClickRename={(peername === sessionProfileName && !peer && isLatestDataset) ? this.handleShowRenameModal() : undefined}
            peer={peer}
            description={this.handleDescription()}
            isLatestDataset={isLatestDataset}
            sessionProfile={this.props.sessionProfile}
            peername={peername}
            name={name}
          />
        </div>
        <div className={css('middlePanel')}>{this.renderTabPanel(css)}</div>
        {/* <div className={css('bottomPanel')}>
            <div className='col-md-7' >
              <h5>Details</h5>
              <p>{this.handleDescription(dataset)}</p>
            </div>
            <div className='col-md-3'>
              <h5>Contributors</h5>
            </div>
          </div> */}
      </div>)
  }

  template (css) {
    const { datasetRef, peername, name, viewMode } = this.props
    const { transitionViewModes } = this.state
    // const path = "/" + address.replace(".", "/", -1)
    // const hasData = (dataset && (dataset.url || dataset.file || dataset.data));
    // TODO hasData is assigned a value but never used, consider depreciation
    // const hasData = true
    if (!datasetRef) {
      return <Spinner />
    }

    if (datasetRef && datasetRef.dataset && datasetRef.dataset.structure && typeof datasetRef.dataset.structure === 'string') {
      return (<Spinner />)
    }

    return (
      <div className={css('wrap')} >
        {(viewMode === 'viz' || transitionViewModes) &&
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          transition: 'left 0.5s',
          left: (viewMode === 'viz') ? 0 : '100%',
          background: defaultPalette.background,
          boxShadow: '0 0 16px rba(0,0,0,0.75)'
        }}>
          {this.renderViz(peername, name)}
        </div>
        }
        {(viewMode === 'dataset' || transitionViewModes) && this.renderDataset(css)}
      </div>
    )
  }

  styles () {
    const palette = defaultPalette

    return {
      wrap: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'stretch',
        overflowY: 'scroll'
      },
      content: {
        margin: '0 auto',
        maxWidth: 960,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      },
      overflow: {
        width: '100%',
        padding: 30
      },
      topPanel: {
        flex: '0 0 125px',
        width: '100%'
      },
      middlePanel: {
        flex: '5 1 500px',
        width: '100%',
        marginTop: 20,
        background: palette.sink
      },
      // bottomPanel: {
      //   flex: 'auto',
      //   marginTop: 40,
      //   minHeight: 100,
      //   width: '100%'
      // },
      comingSoonWrap: {
        margin: 20
      },
      tabPanelWrap: {
        padding: '40px 20px 20px 20px',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'stretch'
      },
      width: {
        width: '100%'
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
