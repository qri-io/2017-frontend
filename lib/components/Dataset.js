/* globals __BUILD__, confirm */
import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'

import Base from './Base'
import TabPanel from './TabPanel'
import DatasetHeader from './DatasetHeader'
import Structure from './Structure'
import Meta from './Meta'
import Body from './Body'
import CommitsContainer from '../containers/Commits'
import NameDataset from './NameDataset'
import BodyReadOnly from './BodyReadOnly'
import Spinner from './Spinner'

const RENAME_DATASET_MODAL = 'RENAME_DATASET_MODAL'

export default class Dataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      expanded: undefined
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
      'renderTabPanel',
      'handleToggleExpand'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { peername, name, datasetRef, path, body, bodypath, sessionProfile, schema } = this.props
    if (!path) {
      this.props.loadDatasetByName(peername, name)
    } else if (!datasetRef || !bodypath || !schema) {
      this.props.loadDatasetByPath(path, ['bodypath', 'structure.schema'])
    } else if (sessionProfile && !body) {
      this.props.loadDatasetBody(path, bodypath)
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps.schema)
    const { peername, name, sessionProfile, bodypath } = this.props
    if (!nextProps.path || peername !== nextProps.peername || name !== nextProps.name) {
      this.props.loadDatasetByName(nextProps.peername, nextProps.name)
    } else if (!nextProps.datasetRef || !nextProps.bodypath || !nextProps.schema) {
      this.props.loadDatasetByPath(nextProps.path, ['bodypath', 'structure.schema'])
    } else if (sessionProfile && nextProps.bodypath !== bodypath) {
      this.props.loadDatasetBody(nextProps.path, nextProps.bodypath)
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
       isLatestDataset && sessionProfileName === peername) ? this.handleEditMetadata() : undefined} /></div>)
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

  renderComingSoon (css) {
    return (
      <div className={css('comingSoonWrap')}>
        <p>Coming soon!</p>
      </div>
    )
  }

  handleToggleExpand (panel) {
    if (this.state.expanded === panel) {
      panel = undefined
    }
    this.setState({ expanded: panel })
  }

  renderTabPanel (css) {
    const { datasetRef, peername, name, peer } = this.props
    const { path, dataset } = datasetRef
    const { tabIndex, expanded } = this.state
    if (peer) {
      return (
        <TabPanel
          index={tabIndex}
          labels={['Body', 'Structure', 'Meta']}
          onSelectPanel={this.changeTabIndex}
          onToggleExpand={this.handleToggleExpand.bind(this, 'tabPanel')}
          expanded={expanded === 'tabPanel'}
          components={[
            this.renderBody(css),
            this.renderStructure(css, dataset),
            this.renderMeta(css)
          ]}
        />
      )
    }
    return (
      <TabPanel
        index={tabIndex}
        labels={['Body', 'Structure', 'Meta', 'Changes']}
        onSelectPanel={this.changeTabIndex}
        onToggleExpand={this.handleToggleExpand.bind(this, 'tabPanel')}
        expanded={expanded === 'tabPanel'}
        components={[
          this.renderBody(css),
          this.renderStructure(css, dataset),
          this.renderMeta(css),
          this.renderChanges(peername, name, path)
        ]}
      />
    )
  }

  template (css) {
    const { datasetRef, isLatestDataset, peername, peer, sessionProfileName } = this.props
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

    const { expanded } = this.state
    switch (expanded) {
      case 'tabPanel':
        return (
          <div className={css('tabPanelWrap')}>
            <div className={css('expanded')}>
              {this.renderTabPanel(css)}
            </div>
          </div>
        )
      default:
        return (
          <div className={css('wrap')} >
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
              />
            </div>
            <div className={css('middlePanel')}>{this.renderTabPanel(css)}</div>
            <div className={css('bottomPanel')}>
              {/* <div className='col-md-7' >
                <h5>Details</h5>
                <p>{this.handleDescription(dataset)}</p>
              </div>
              <div className='col-md-3'>
                <h5>Contributors</h5>
              </div> */}
            </div>
          </div>
        )
    }
  }

  styles () {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20,
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'stretch'
      },
      overflow: {
        width: '100%',
        paddingLeft: 10,
        paddingBottom: 10
      },
      topPanel: {
        flex: 'auto',
        width: '100%'
      },
      middlePanel: {
        flex: '1 1 500px',
        width: '100%'
      },
      bottomPanel: {
        flex: 'auto',
        marginTop: 40,
        minHeight: 100,
        width: '100%'
      },
      comingSoonWrap: {
        margin: 20
      },
      tabPanelWrap: {
        padding: '40px 20px 20px 20px',
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'stretch'
      },
      expanded: {
        flex: '2 1 100%'
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
  path: PropTypes.string,
  goBack: PropTypes.func.isRequired
}

Dataset.defaultProps = {
}
