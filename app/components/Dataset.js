/* globals confirm */
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'

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
      tabIndex: 0,
      loading: true,
      error: false
    };

    [
      'handleLoadMoreResults',
      'handleDownloadDataset',
      'handleDeleteDataset',
      'handleGoBack',
      'handleAddDataset',
      'handleSetLoadingData',
      'changeTabIndex',
      'handleEditMetadata',
      'renderFieldsList',
      'renderReadme',
      'renderData',
      'renderDescription'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    // this.props.loadDatasetByAddress(this.props.address, ["fields"])
    // this.props.loadDatasetReadme(this.props.address)
    // this.props.loadDatasetChildren(this.props.address)
    this.props.loadDatasetData(this.props.datasetRef.path, (error) => {
      this.setState({loading: false, error: error})
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.path !== this.props.path) {
      this.props.loadDatasetData(nextProps.path,
        (error) => {
          this.setState({loading: false, error: error})
        })
    }
  }

  handleDownloadDataset (e) {
    e.preventDefault()
    this.props.downloadDataset(this.props.address)
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
    }, (error) => {
      this.setState({loading: false, error: error})
    }
    )
  }

  handleGoBack () {
    this.props.goBack()
  }

  handleAddDataset (path, name, peer) {
    return peer ? () => this.props.addDataset(path, name) : undefined
  }

  changeTabIndex (index) {
    index === 2 ? this.setState({loading: true}) : undefined
    this.setState({ tabIndex: index })
  }

  handleEditMetadata (path) {
    return () => this.props.history.push(`/edit/${path.slice(6, -13)}`)
  }

  handleSetLoadingData (loading) {
    this.setState({ loading: loading })
  }

  renderFieldsList (dataset) {
    if (dataset.structure && dataset.structure.schema) {
      return (<FieldsList fields={dataset.structure.schema.fields} />)
    } else {
      return (<p>This dataset currently has no specified fields</p>)
    }
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

  renderData () {
    const { data, datasetRef } = this.props
    const { loading, error } = this.state
    const { structure } = datasetRef.dataset
    // console.log('rendering data')
    // if (!data || !structure) {
    //   console.log('in renderdata, no data or no structure')
    //   return undefined
    // }
    return (
      <DatasetDataGrid
        dataset={datasetRef && datasetRef.dataset}
        data={data}
        onLoadMore={this.handleLoadMoreResults}
        onSetLoadingData={this.handleSetLoadingData}
        loading={loading}
        error={error}
                // bounds={bottomBox}
              />
    )
  }

  renderDescription (dataset) {
    if (!dataset.description) { return <p>No description given for this dataset</p> }
    return (
      <p>{ dataset.description }</p>
    )
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
    const { tabIndex } = this.state
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
            this.renderData()
          ]}
        />
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
  runQuery: PropTypes.func.isRequired,
  downloadDataset: PropTypes.func.isRequired,
  palette: Palette
}

Dataset.defaultProps = {
  palette: defaultPalette
}
