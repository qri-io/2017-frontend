/* globals __BUILD__, confirm */
import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'

import Base from './Base'
import TabPanel from './TabPanel'
import DatasetHeader from './DatasetHeader'
import Structure from './Structure'
import Meta from './Meta'
import Data from './Data'
import CommitsContainer from '../containers/Commits'
import NameDataset from './NameDataset'
import DataReadOnly from './DataReadOnly'
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
      'renderData',
      'renderComingSoon',
      'renderTabPanel',
      'handleToggleExpand'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    const { peername, name, datasetRef, path, data, datapath, sessionProfile } = this.props
    if (!path) {
      this.props.loadDatasetByName(peername, name)
    } else if (!datasetRef) {
      this.props.loadDatasetByPath(path)
    } else if (sessionProfile && !data) {
      this.props.loadDatasetData(path, datapath)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { peername, name, sessionProfile } = this.props
    if (!nextProps.path || peername !== nextProps.peername || name !== nextProps.name) {
      this.props.loadDatasetByName(nextProps.peername, nextProps.name)
    } else if (!nextProps.datasetRef) {
      this.props.loadDatasetByPath(nextProps.path)
    } else if (sessionProfile && !nextProps.data && !nextProps.noData && !nextProps.error) {
      this.props.loadDatasetData(nextProps.path, nextProps.datapath)
    }
  }

  handleReload () {
    const { path, datapath } = this.props
    this.props.loadDatasetData(path, datapath)
  }

  handleDownloadDataset (peername, name, peer) {
    if (!peer) {
      return `${__BUILD__.API_URL}/export/${peername}/${name}`
    }
  }

  handleDeleteDataset (datasetRef, peer) {
    if (!peer) {
      return () => {
        if (confirm('are you sure you want to delete this dataset?')) {
          this.props.deleteDataset(datasetRef, '/')
        }
      }
    }
  }

  handleGoBack () {
    this.props.goBack()
  }

  handleAddDataset (peername, name, peer) {
    return peer ? () => {
      this.props.addDataset(peername, name, '', '').then(() => {
        this.props.loadDatasets(this.props.sessionProfile)
      })
    } : undefined
  }

  changeTabIndex (index) {
    this.setState({ tabIndex: index })
  }

  handleEditMetadata () {
    const { peername, name, datasetRef, peer } = this.props
    const { path } = datasetRef
    if (!peer) {
      return () => this.props.history.push(`/${peername}/${name}/at${path}/meta/edit`)
    } else {
      return undefined
    }
  }

  handleRenameDataset (datasetRef, newName, callback) {
    this.props.renameDataset(datasetRef, newName).then(action => callback(action))
  }

  handleShowRenameModal (peer, datasetRef) {
    return !peer ? () => {
      const data = {
        datasetRef,
        handleNameDataset: this.handleRenameDataset,
        hideModal: this.props.hideModal
      }
      this.props.showModal(RENAME_DATASET_MODAL, this, data, false)
    } : undefined
  }

  handleDescription (dataset) {
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

  renderMeta (css, dataset) {
    if (dataset.meta) {
      return (<div className={css('overflow')} ><Meta meta={dataset.meta} onClickEdit={this.handleEditMetadata()} /></div>)
    } else {
      return (<p>This dataset currently has no specified metadata</p>)
    }
  }

  modal (name, data = {}) {
    switch (name) {
      case RENAME_DATASET_MODAL:
        return <NameDataset data={data} />
      default:
        return undefined
    }
  }

  renderData (css) {
    const { data, datasetRef, sessionProfile } = this.props
    if (sessionProfile) {
      return (
        <div className={css('overflow')} >
          <Data
            data={data}
            datasetRef={datasetRef}
            noData={this.props.noData}
            error={this.props.error}
            onClick={this.handleReload}
            onSetLoadingData={this.props.loadDatasetData}
          />
        </div>
      )
    } else {
      return (
        <div className={css('overflow')} >
          <DataReadOnly />
        </div>
      )
    }
  }

  renderChanges (peername, name, path) {
    return (
      <CommitsContainer path={`/${peername}/${name}`} />
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
          labels={['Data', 'Structure', 'Meta']}
          onSelectPanel={this.changeTabIndex}
          onToggleExpand={this.handleToggleExpand.bind(this, 'tabPanel')}
          expanded={expanded === 'tabPanel'}
          components={[
            this.renderData(css),
            this.renderStructure(css, dataset),
            this.renderMeta(css, dataset)
          ]}
        />
      )
    }
    return (
      <TabPanel
        index={tabIndex}
        labels={['Data', 'Structure', 'Meta', 'Changes']}
        onSelectPanel={this.changeTabIndex}
        onToggleExpand={this.handleToggleExpand.bind(this, 'tabPanel')}
        expanded={expanded === 'tabPanel'}
        components={[
          this.renderData(css),
          this.renderStructure(css, dataset),
          this.renderMeta(css, dataset),
          this.renderChanges(peername, name, path)
        ]}
      />
    )
  }

  template (css) {
    const { datasetRef, isLatestDataset, name, peername, peer } = this.props
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

    const { dataset, path } = datasetRef
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
                onClickDelete={this.handleDeleteDataset(datasetRef, peer)}
                exportPath={this.handleDownloadDataset(peername, name, peer)}
                onGoBack={this.handleGoBack}
                onClickAdd={this.handleAddDataset(peername, name, peer)}
                onClickRename={this.handleShowRenameModal(peer, datasetRef)}
                peer={peer}
                description={this.handleDescription(dataset)}
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
        overflow: 'auto',
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
