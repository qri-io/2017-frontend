/* globals __BUILD__, confirm */
import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'

import Base from './Base'
import DatasetDataGrid from './DatasetDataGrid'
import TabPanel from './TabPanel'
import DatasetHeader from './DatasetHeader'
import Structure from './Structure'
import CommitsContainer from '../containers/Commits'
import NameDataset from './NameDataset'
import Spinner from './Spinner'

const RENAME_DATASET_MODAL = 'RENAME_DATASET_MODAL'

export default class Dataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      loading: true,
      error: false,
      expanded: undefined
    };

    [
      'handleLoadDatasetData',
      'handleLoadMoreResults',
      'handleDownloadDataset',
      'handleDeleteDataset',
      'handleGoBack',
      'handleAddDataset',
      'handleSetLoadingData',
      'handleDescription',
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
    const { datasetRef } = this.props
    if (!datasetRef || (datasetRef && !datasetRef.peer)) {
      this.props.loadDataset(this.props.path)
    }
    this.handleLoadDatasetData(this.props.path)
  }

  handleLoadDatasetData (path) {
    this.props.loadDatasetData(path, (error) => {
      if (error) {
        this.setState({loading: false, error: error})
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.path !== this.props.path) {
      this.setState({loading: true})
      this.props.loadDataset(nextProps.path)
      this.changeTabIndex(0)
      this.props.loadDatasetData(nextProps.path,
        (error) => {
          if (error) {
            this.setState({loading: false, error: error})
          }
        })
    } else if (nextProps.datasetRef !== this.props.datasetRef) {
      this.setState({loading: false})
    } else if (nextProps.data !== this.props.data) {
      this.setState({loading: false})
    }
  }

  handleDownloadDataset (path, peer) {
    if (!peer) {
      return `${__BUILD__.API_URL}/download${path}`
    }
  }

  handleDeleteDataset (peer) {
    if (!peer) {
      return () => {
        if (confirm('are you sure you want to delete this dataset?')) {
          this.props.deleteDataset(this.props.datasetRef.name, this.props.path, '/')
        }
      }
    }
  }

  handleLoadMoreResults () {
    this.props.runQuery({
      query: this.props.query,
      page: (this.props.results.pageCount + 1)
    }, (error) => {
      this.setState({loading: false, error: error})
    }
    )
  }

  handleGoBack () {
    this.props.goBack()
  }

  handleAddDataset (path, name, peer) {
    return peer ? () => {
      this.props.addDataset(path, name, '', '',
        () => { this.props.loadDatasets() }
        )
    } : undefined
  }

  changeTabIndex (index) {
    let loading = this.state.loading
    if (index === 2) {
      loading = true
    }
    this.setState({ tabIndex: index, loading })
  }

  handleEditMetadata (path, peer) {
    if (!peer) {
      return () => this.props.history.push(`/edit/${path.slice(6, -13)}`)
    } else {
      return undefined
    }
  }

  handleRenameDataset (currentName, newName, path, callback) {
    this.props.renameDataset(currentName, newName, callback)
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

  handleSetLoadingData (loading) {
    this.setState({ loading: loading })
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

  modal (name, data = {}) {
    switch (name) {
      case RENAME_DATASET_MODAL:
        return <NameDataset data={data} />
      default:
        return undefined
    }
  }

  renderData () {
    const { data, datasetRef } = this.props
    const { loading, error } = this.state
    return (
      <DatasetDataGrid
        dataset={datasetRef && datasetRef.dataset}
        data={data}
        onLoadMore={this.handleLoadMoreResults}
        onSetLoadingData={this.handleSetLoadingData}
        onReload={this.handleLoadDatasetData}
        loading={loading}
        path={datasetRef && datasetRef.path}
        error={error}
      />
    )
  }

  renderCommits (path) {
    return (
      <CommitsContainer path={path} />
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
    const { datasetRef } = this.props
    const { dataset, path } = datasetRef
    const { tabIndex, expanded } = this.state
    return (
      <TabPanel
        index={tabIndex}
        labels={['Data', 'Structure', 'Queries', 'Commits', 'Editor']}
        onSelectPanel={this.changeTabIndex}
        onToggleExpand={this.handleToggleExpand.bind(this, 'tabPanel')}
        expanded={expanded === 'tabPanel'}
        components={[
          this.renderData(),
          this.renderStructure(css, dataset),
          this.renderComingSoon(css),
          this.renderCommits(path),
          this.renderComingSoon(css)
        ]}
      />
    )
  }

  template (css) {
    const { datasetRef } = this.props
    // const path = "/" + address.replace(".", "/", -1)
    // const hasData = (dataset && (dataset.url || dataset.file || dataset.data));
    // TODO hasData is assigned a value but never used, consider depreciation
    // const hasData = true
    if (!datasetRef) {
      return (
        <div className='dataset container'>
          <p>No Dataset</p>
        </div>
      )
    }

    if (datasetRef && datasetRef.dataset && datasetRef.dataset.structure && typeof datasetRef.dataset.structure === 'string') {
      return (<Spinner />)
    }

    const { dataset, path, name, peer } = datasetRef
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
                onClickDelete={this.handleDeleteDataset(peer)}
                exportPath={this.handleDownloadDataset(path, peer)}
                onClickEdit={this.handleEditMetadata(path, peer)}
                onGoBack={this.handleGoBack}
                onClickAdd={this.handleAddDataset(path, name, peer)}
                onClickRename={this.handleShowRenameModal(peer, datasetRef)}
                peer={peer}
                description={this.handleDescription(dataset)}
              />
            </div>
            <div className={css('middlePanel')}>{this.renderTabPanel(css)}</div>
            <div className={css('bottomPanel')}>
              <div className='col-md-7' >
                <h5>Details</h5>
                <p>{this.handleDescription(dataset)}</p>
              </div>
              <div className='col-md-3'>
                <h5>Contributors</h5>
              </div>
            </div>
          </div>
        )
    }
  }

  styles (props) {
    // const { palette } = props
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
        overflow: 'auto'
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
  // Readme model if available
  readme: PropTypes.object,
  // default query to show if none is present
  default_query: PropTypes.object,

  // query for console
  query: PropTypes.object.isRequired,
  // results (if any)
  results: PropTypes.object,
  path: PropTypes.string,
  goBack: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  palette: Palette
}

Dataset.defaultProps = {
  palette: defaultPalette
}
