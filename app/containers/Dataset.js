/* globals confirm */
import { connect } from 'react-redux'

import { downloadDataset, deleteDataset, loadDatasetData, addDataset, loadDatasets } from '../actions/dataset'
import { setQuery, runQuery, downloadQuery } from '../actions/query'

import { selectDataset, selectDatasetData, selectDatasetDataIsFetching } from '../selectors/dataset'

import Dataset from '../components/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    // console.log(ownProps.match.params)
    // const path = ownProps.path || `/${ownProps.params.splat}`
    const path = `/ipfs/${ownProps.match.params.id}/dataset.json`
    return Object.assign({
      path,
      datasetRef: selectDataset(state, path),
      data: selectDatasetData(state, path),
      history: ownProps.history,
      goBack: ownProps.history.goBack,
      bounds: state.layout.main
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    downloadQuery,
    downloadDataset,
    deleteDataset,
    addDataset,
    loadDatasetData,
    loadDatasets
  }
)(Dataset, 'Dataset')

export default DatasetContainer
