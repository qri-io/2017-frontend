import { connect } from 'react-redux'

import { deleteDataset, loadDatasetData, addDataset, loadDatasets, loadDataset, renameDataset } from '../actions/dataset'
import { setQuery, runQuery, downloadQuery } from '../actions/query'

import { selectDataset, selectDatasetData } from '../selectors/dataset'
import { showModal, hideModal } from '../actions/app'

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
      goBack: ownProps.history.goBack
    }, state.console, ownProps)
  }, {
    hideModal,
    showModal,
    setQuery,
    runQuery,
    downloadQuery,
    deleteDataset,
    renameDataset,
    addDataset,
    loadDatasetData,
    loadDataset,
    loadDatasets
  }
)(Dataset, 'Dataset')

export default DatasetContainer
