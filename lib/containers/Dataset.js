import { connect } from 'react-redux'

import { deleteDataset, loadDatasetData, addDataset, loadDatasets, loadDataset } from '../actions/dataset'
import { setQuery, runQuery, downloadQuery } from '../actions/query'

import { selectDataset, selectDatasetData } from '../selectors/dataset'

import Dataset from '../components/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    // console.log(ownProps.match.params)
    // const path = ownProps.path || `/${ownProps.params.splat}`
    const path = `/ipfs/${ownProps.match.params.id}/dataset.json`
    const bounds = state.layout.main
    const topBox = {
      top: bounds.top,
      left: 0,
      width: bounds.width,
      height: bounds.height * 0.3,
      overflow: 'auto'
    }
    const bottomBox = {
      top: bounds.height * 0.3,
      left: 0,
      width: bounds.width,
      height: bounds.height * 0.7,
      overflow: 'auto'
    }
    return Object.assign({
      path,
      datasetRef: selectDataset(state, path),
      data: selectDatasetData(state, path),
      history: ownProps.history,
      goBack: ownProps.history.goBack,
      bounds: bounds,
      topBox,
      bottomBox
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    downloadQuery,
    deleteDataset,
    addDataset,
    loadDatasetData,
    loadDataset,
    loadDatasets
  }
)(Dataset, 'Dataset')

export default DatasetContainer
