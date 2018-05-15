import { connect } from 'react-redux'

import { deleteDataset, loadDatasetData, addDataset, loadDatasets, loadDatasetByPath, loadDatasetByName, renameDataset } from '../actions/dataset'

import { selectDatasetByPath, selectDatasetIdByName, selectDatasetData, selectNoDatasetData } from '../selectors/dataset'
import { selectError, selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectSessionProfileId, selectSessionProfilename, selectIsSessionDataset } from '../selectors/session'
import { showModal, hideModal } from '../actions/app'

import Dataset from '../components/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    const sessionProfile = selectSessionProfileId(state)
    var path, latestPath, isLatestDataset
    var peername = params.peername
    if (sessionProfile && peername === 'me') {
      peername = selectSessionProfilename(state)
    }
    const name = params.name
    latestPath = selectDatasetIdByName(state, peername, name)
    if (params.network && params.hash) {
      path = `/${params.network}/${params.hash}`
    }
    isLatestDataset = !!(path && path === latestPath) || !!(!path && latestPath)
    path = isLatestDataset ? latestPath : path
    const datasetRef = selectDatasetByPath(state, path)
    const datapath = datasetRef && datasetRef.dataset && datasetRef.dataset.dataPath
    return Object.assign({
      peername,
      name,
      sessionProfile,
      isLatestDataset,
      datasetRef,
      path,
      datapath,
      sessionProfileName: selectSessionProfilename(state),
      peer: !selectIsSessionDataset(state, datasetRef),
      data: selectDatasetData(state, datapath),
      noData: selectNoDatasetData(state, 'datasetData', datapath),
      loading: selectIsFetching(state, 'datasetData', datapath),
      nextPage: selectPageCount(state, 'datasetData', datapath) + 1,
      fetchedAll: selectFetchedAll(state, 'datasetData', datapath),
      error: selectError(state, 'datasetData', datapath),
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
    loadDatasetByPath,
    loadDatasets,
    loadDatasetByName
  }
)(Dataset, 'Dataset')

export default DatasetContainer
