/* globals __BUILD__, confirm */
import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'

import Base from './Base'
import DatasetDataGrid from './DatasetDataGrid'
import TabPanel from './TabPanel'
import DatasetHeader from './DatasetHeader'
import FieldsList from './FieldsList'

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
    if (!this.props.datasetRef) {
      this.props.loadDatasets()
    } else {
      this.props.loadDatasetData(this.props.datasetRef.path, (error) => {
        this.setState({loading: false, error: error})
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.path !== this.props.path) {
      this.props.loadDatasetData(nextProps.path,
        (error) => {
          this.setState({loading: false, error: error})
        })
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

  handleSetLoadingData (loading) {
    this.setState({ loading: loading })
  }

  renderFieldsList (css, bottomBox, dataset) {
    if (dataset.structure && dataset.structure.schema) {
      return (<div className={css('overflow')} style={{ height: `${bottomBox.height - 79}px` }}><FieldsList fields={dataset.structure.schema.fields} /></div>)
    } else {
      return (<p>This dataset currently has no specified fields</p>)
    }
  }

  renderReadme (css, bottomBox, readme, dataset) {
    if (!readme) return this.renderDescription(css, bottomBox, dataset)
    return (
      <div className='row'>
        <section className='col-md-12'>
          <ReactMarkdown escapeHtml source={readme.text} />
        </section>
      </div>
    )
  }

  renderData (bottomBox) {
    const { data, datasetRef } = this.props
    const { loading, error } = this.state
    // const { structure } = datasetRef.dataset
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
        bounds={bottomBox}
                // bounds={bottomBox}
              />
    )
  }

  renderDescription (css, bottomBox, dataset) {
    if (!dataset.description) { return <p>No description given for this dataset</p> }
    return (
      <div className={css('overflow')} style={{ height: `${bottomBox.height - 79}px` }}><p>{ dataset.description }</p></div>
    )
  }

  template (css) {
    const { datasetRef, readme, topBox, bottomBox } = this.props
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

    const { dataset, path, name, peer } = datasetRef
    const { tabIndex } = this.state
    return (
      <div className={css('wrap')} >
        <DatasetHeader datasetRef={datasetRef} onClickDelete={this.handleDeleteDataset(peer)} exportPath={this.handleDownloadDataset(path, peer)} onClickEdit={this.handleEditMetadata(path, peer)} onGoBack={this.handleGoBack} onClickAdd={this.handleAddDataset(path, name, peer)} peer={peer} bounds={topBox} />
        <TabPanel
          index={tabIndex}
          labels={['Info', 'Fields', 'Data', 'Queries', 'History']}
          onSelectPanel={this.changeTabIndex}
          bounds={bottomBox}
          components={[
            this.renderReadme(css, bottomBox, readme, dataset),
            this.renderFieldsList(css, bottomBox, dataset),
            this.renderData(bottomBox)
          ]}
        />
      </div>
    )
  }

  styles (props) {
    // const { palette } = props
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      },
      overflow: {
        overflow: 'auto'
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
  bounds: PropTypes.object.isRequired,
  topBox: PropTypes.object.isRequired,
  bottomBox: PropTypes.object.isRequired,
  palette: Palette
}

Dataset.defaultProps = {
  palette: defaultPalette
}
