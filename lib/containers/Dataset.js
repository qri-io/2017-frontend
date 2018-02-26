import { connect } from 'react-redux'

import { deleteDataset, loadDatasetData, addDataset, loadDatasets, loadDataset, renameDataset } from '../actions/dataset'

import { selectDataset, selectDatasetByName, selectDatasetData } from '../selectors/dataset'
import { showModal, hideModal } from '../actions/app'

import Dataset from '../components/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    // console.log(ownProps.match.params)
    // const path = ownProps.path || `/${ownProps.params.splat}`
    // const path = `/ipfs/${ownProps.match.params.id}/dataset.json`
    var datasetRef
    var path = ''
    var id = ''
    if (params.hash) {
      id = `/${params.network ? params.network : 'ipfs'}/${params.hash}`
      path = `/at${id}`
    }
    path = `${params.peername}/${params.name}${path}`
    if (id) {
      datasetRef = selectDataset(state, id)
    } else {
      datasetRef = selectDatasetByName(state, params.peername, params.name)
    }
    return Object.assign({
      path,
      id,
      datasetRef,
      data: selectDatasetData(state, id),
      history: ownProps.history,
      goBack: ownProps.history.goBack
    }, state.console, ownProps)
  }, {
    hideModal,
    showModal,
    deleteDataset,
    renameDataset,
    addDataset,
    loadDatasetData,
    loadDataset,
    loadDatasets
  }
)(Dataset, 'Dataset')

export default DatasetContainer
