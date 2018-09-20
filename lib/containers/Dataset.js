import { connect } from 'react-redux'

import { deleteDataset, loadDatasetBody, addDataset, loadDatasets, loadDatasetByPath, loadDatasetByName, renameDataset } from '../actions/dataset'

import { selectDatasetByPath, selectDatasetIdByName, selectDatasetBody, selectNoDatasetBody, extractSchema } from '../selectors/dataset'
import { selectError, selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectSessionProfileId, selectSessionProfileName, selectIsSessionDataset } from '../selectors/session'
import { selectLayoutMain } from '../selectors/layout'
import { selectIsTransfering } from '../selectors/transfers'
import { showModal, hideModal } from '../actions/app'

import Dataset from '../components/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    console.log(state)
    const sessionProfile = selectSessionProfileId(state)
    var path, latestPath, isLatestDataset
    var peername = params.peername
    if (sessionProfile && peername === 'me') {
      peername = selectSessionProfileName(state)
    }
    const name = params.name
    latestPath = selectDatasetIdByName(state, peername, name)
    if (params.network && params.hash) {
      path = `/${params.network}/${params.hash}`
    }
    isLatestDataset = !!(path && path === latestPath) || !!(!path && latestPath)
    path = isLatestDataset ? latestPath : path
    const datasetRef = selectDatasetByPath(state, path)
    const bodypath = datasetRef && datasetRef.dataset && datasetRef.dataset.bodyPath
    const sessionProfileName = selectSessionProfileName(state)
    const schema = extractSchema(datasetRef)

    return Object.assign({
      peername,
      name,
      sessionProfile,
      isLatestDataset,
      datasetRef,
      schema,
      path,
      bodypath,
      sessionProfileName,
      transfering: selectIsTransfering(state, path),
      peer: !(sessionProfileName === peername || selectIsSessionDataset(state, datasetRef)),
      body: selectDatasetBody(state, bodypath),
      noBody: selectNoDatasetBody(state, 'datasetBody', bodypath),
      loading: selectIsFetching(state, 'datasetBody', bodypath),
      nextPage: selectPageCount(state, 'datasetBody', bodypath) + 1,
      fetchedAll: selectFetchedAll(state, 'datasetBody', bodypath),
      error: selectError(state, 'datasetBody', bodypath),
      history: ownProps.history,
      goBack: ownProps.history.goBack,
      layoutMain: selectLayoutMain(state),
      viewMode: state.app.viewMode
    }, state.console, ownProps)
  }, {
    hideModal,
    showModal,
    deleteDataset,
    renameDataset,
    addDataset,
    loadDatasetBody,
    loadDatasetByPath,
    loadDatasets,
    loadDatasetByName
  }
)(Dataset, 'Dataset')

export default DatasetContainer
