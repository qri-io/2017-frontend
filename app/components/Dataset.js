/* globals confirm */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'

import { downloadDataset, deleteDataset, loadDatasetData } from '../actions/dataset'
import { setQuery, runQuery, downloadQuery } from '../actions/query'

import Base from './Base'
import DatasetDataGrid from './DatasetDataGrid'
import TabPanel from './TabPanel'
import List from './List'
import DatasetItem from './item/DatasetItem'
import DatasetHeader from './DatasetHeader'
import FieldsList from './FieldsList'
import QueryEditor from './QueryEditor'
import DataTable from './DataTable'

export default class Dataset extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0
    };

    [
      'handleRunQuery',
      'handleEditorChange',
      'handleEditorAddressChange',
      'handleLoadMoreResults',
      'handleDownloadQuery',
      'handleDownloadDataset',
      'handleDeleteDataset',
      'handleGoBack',
      'handleAddDataset',
      'changeTabIndex',
      'handleEditMetadata',
      'renderFieldsList',
      'renderEditButtons',
      'renderResults',
      'renderReadme',
      'renderQueryAndResults',
      'renderData',
      'renderDescription',
      'renderChildDatasets',
      'renderTabPanel'
    ].forEach((m) => { this[m] = this[m].bind(this) })

    // this.debouncedSetQuery = debounce(props.setQuery, 200)
  }

  componentWillMount () {
    // this.props.loadDatasetByAddress(this.props.address, ["fields"])
    // this.props.loadDatasetReadme(this.props.address)
    // this.props.loadDatasetChildren(this.props.address)
    this.props.loadDatasetData(this.props.datasetRef.path, 1, 50)

    // match the address to the current namespce, unless there's already a query
    if (this.props.datasetRef && this.props.datasetRef.default_query) {
      this.props.setQuery(this.props.datasetRef.default_query)
    } else {
      this.props.setQuery({
        // address : this.props.address,
        statement: `select * from ${this.props.datasetRef.name}`
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.path !== this.props.path) {
      this.props.loadDatasetByAddress(nextProps.path)
      this.props.loadDatasetData(nextProps.path, 1, 50)
    }

    if (nextProps.dataset && nextProps.dataset !== this.props.dataset) {
      // this.props.setQuery(nextProps.dataset.default_query || { statement: `select * from ${nextProps.address}` });
    }
  }

  handleEditorAddressChange (value) {
    this.props.setQueryAddress(value)
  }

  handleEditorChange (value) {
    // this.debouncedSetQuery(value)
    this.props.setQuery(value)
  }

  handleDownloadDataset (e) {
    e.preventDefault()
    this.props.downloadDataset(this.props.address)
  }

  handleRunQuery (e) {
    e.preventDefault()
    this.props.runQuery({
      query: this.props.query,
      page: 1
    })
  }

  handleDownloadQuery () {
    this.props.runQuery({
      query: this.props.query,
      download: true
    })
  }

  handleDeleteDataset () {
    if (confirm('are you sure you want to delete this dataset?')) {
      this.props.deleteDataset(this.props.datasetRef.path, '/')
    }
  }

  handleLoadMoreResults () {
    this.props.runQuery({
      query: this.props.query,
      page: (this.props.results.pageCount + 1)
    })
  }

  handleGoBack () {
    this.props.goBack()
  }

  handleAddDataset (path, name, peer) {
    return peer ? () => this.props.addDataset(path, name) : undefined
  }

  changeTabIndex (index) {
    this.setState({ tabIndex: index })
  }

  handleEditMetadata (path) {
    return () => this.props.history.push(`/edit/${path.slice(6, -13)}`)
  }

  renderFieldsList (dataset) {
    if (dataset.structure && dataset.structure.schema) {
      return (<FieldsList fields={dataset.structure.schema.fields} />)
    } else {
      return (<p>This dataset currently has no specified fields</p>)
    }
  }

  renderEditButtons (props) {
    const { path, permissions } = props

    if (permissions.migrate && permissions.change) {
      return (
        <div>
          <Link to={`${path}/edit`}><button type='button' className='btn btn-primary' style={{ marginRight: 5 }}>Edit</button></Link>
          <Link to={`${path}/migrations/new`}><button type='button' className='btn btn-primary' style={{ marginRight: 5 }}>New Migration</button></Link>
          <Link to={`${path}/changes/new`}><button type='button' className='btn btn-primary' style={{ marginRight: 5 }}>New Change</button></Link>
        </div>
      )
    }

    return undefined
  }

  renderResults (props) {
    const { results } = props
    if (!results) { return undefined }
    return (
      <div className='col-md-12'>
        <hr className='green' />
        <h4 className='green'>Results</h4>
        <DatasetDataGrid
          dataset={datasetRef && datasetRef.dataset}
          data={data}
          onLoadMore={this.handleLoadMoreResults}
          bounds={bottomBox}
              />
      </div>
    )
  }

  renderReadme (readme, dataset) {
    if (!readme) return this.renderDescription(dataset)
    return (
      <div className='row'>
        <section className='col-md-12'>
          <ReactMarkdown escapeHtml source={readme.text} />
        </section>
      </div>
    )
  }

  renderQueryAndResults () {
    const { query } = this.props
    return (
      <div className='row'>
        <div className='col-md-12'>
          <QueryEditor query={query} onRun={this.handleRunQuery} onDownload={this.handleDownloadQuery} onChange={this.handleEditorChange} />
        </div>
        {this.renderResults(this.props)}
      </div>
    )
  }

  renderData () {
    const { data, datasetRef } = this.props
    const { structure } = datasetRef.dataset

    if (!data || !structure) { return undefined }
    return (
      <div className='row'>
        <div className='col-md-12'>
          <hr className='green' />
          <h4 className='green'>Data</h4>
          <DatasetDataGrid
            dataset={datasetRef && datasetRef.dataset}
            data={data}
            onLoadMore={this.handleLoadMoreResults}
                // bounds={bottomBox}
              />
        </div>
      </div>
    )
  }

  renderDescription (dataset) {
    if (!dataset.description) { return <p>No description given for this dataset</p> }
    return (
      <div className='row'>
        <section className='col-md-12'>
          <p>{ dataset.description }</p>
        </section>
      </div>
    )
  }

  renderChildDatasets () {
    return (
      <div className='row'>
        <section className='col-md-12'>
          <hr className='blue' />
          <h4>Children:</h4>
        </section>
        <List component={DatasetItem} data={this.props.descendants} />
      </div>
    )
  }

  renderTabPanel (readme, dataset, tabIndex) {
    if (readme || dataset.description) {
      return (
        <TabPanel
          index={tabIndex}
          labels={['Info', 'Fields', 'Data', 'Queries', 'History']}
          onSelectPanel={this.changeTabIndex}
          components={[
            this.renderReadme(readme, dataset),
            this.renderFieldsList(dataset),
            // this.renderMetadata(dataset),
            this.renderData()
          ]}
        />
      )
    } else {
      return (
        <TabPanel
          index={tabIndex}
          labels={['Metadata', 'Data']}
          onSelectPanel={this.changeTabIndex}
          components={[
            this.renderFieldsList(dataset),
            // this.renderMetadata(dataset),
            this.renderData()
          ]}
        />
      )
    }
  }

  template (css) {
    const { datasetRef, readme, peer } = this.props
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

    const { dataset, path, name } = datasetRef
    const { tabIndex, editMetadata } = this.state
    return (
      <div className={css('wrap')} >
        <DatasetHeader datasetRef={datasetRef} onClickDelete={this.handleDeleteDataset} onClickExport={this.handleDownloadDataset} onClickEdit={this.handleEditMetadata(path)} onGoBack={this.handleGoBack} onClickAdd={this.handleAddDataset(path, name, peer)} />
        <TabPanel
          index={tabIndex}
          labels={['Info', 'Fields', 'Data', 'Queries', 'History']}
          onSelectPanel={this.changeTabIndex}
          components={[
            this.renderReadme(readme, dataset),
            this.renderFieldsList(dataset),
            // this.renderMetadata(dataset),
            this.renderData()
          ]}
        />
        {/* this.renderTabPanel(readme, dataset, tabIndex) */}
        <div className='wrapper'>
          <div className='col-md-12'>
            { this.renderEditButtons(this.props) }
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
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
  results: React.PropTypes.object,
  path: PropTypes.string,
  goBack: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  downloadDataset: PropTypes.func.isRequired,
  palette: Palette
}

Dataset.defaultProps = {
  permissions: {
    edit: false,
    migrate: false,
    change: false
  },
  palette: defaultPalette
}
