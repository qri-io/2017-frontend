import { connect } from 'react-redux'

import {
  deleteDataset,
  loadDatasetBody,
  addDataset,
  loadDatasets,
  loadDatasetByPath,
  loadDatasetByName,
  renameDataset,
  togglePublishDataset,
  updateDataset
} from '../actions/dataset'

import {
  loadRegistryDatasetByName,
  loadRegistryDatasetByPath
} from '../actions/registry'

import {
  selectDatasetByPath,
  selectDatasetIdByName,
  selectDatasetBody,
  selectNoDatasetBody,
  extractSchema,
  isLocalDataset
} from '../selectors/dataset'

import {
  selectError,
  selectIsFetching,
  selectPageCount,
  selectFetchedAll
} from '../selectors/pagination'

import {
  selectSessionProfileId,
  selectSessionProfileHandle
} from '../selectors/session'

import {
  isRegistryDataset,
  selectRegistryDatasetIdByName
} from '../selectors/registry'

import { editDataset } from '../actions/editor'
import { selectProfileByName } from '../selectors/profiles'
import { selectLayoutMain } from '../selectors/layout'
import { selectIsTransfering } from '../selectors/transfers'
import { showModal, hideModal } from '../actions/app'
import { loadProfileByName } from '../actions/profiles'

import Dataset from '../components/dataset/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    const { params } = ownProps.match
    const sessionProfile = selectSessionProfileId(state)
    var path, latestPath, isLatestDataset
    var peername = params.peername
    if (sessionProfile && peername === 'me') {
      peername = selectSessionProfileHandle(state)
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
    const sessionProfileHandle = selectSessionProfileHandle(state)
    const schema = extractSchema(datasetRef)

    return Object.assign({
      peername,
      name,
      sessionProfile,
      datasetRef,
      schema,
      path,
      bodypath,
      profile: selectProfileByName(state, peername),
      transfering: selectIsTransfering(state, path),
      body: selectDatasetBody(state, bodypath),
      noBody: selectNoDatasetBody(state, 'datasetBody', bodypath),
      loadingBody: selectIsFetching(state, 'datasetBody', bodypath),
      nextPage: selectPageCount(state, 'datasetBody', bodypath) + 1,
      fetchedAll: selectFetchedAll(state, 'datasetBody', bodypath),
      error: selectError(state, 'datasetBody', bodypath),
      history: ownProps.history,
      goBack: ownProps.history.goBack,
      layoutMain: selectLayoutMain(state),
      viewMode: state.app.viewMode,
      registryVersion: selectRegistryDatasetIdByName(state, peername, name),

      isLatestDataset,
      isInNamespace: sessionProfileHandle === peername,
      fromRegistry: isRegistryDataset(state, path),
      isLocal: isLocalDataset(state, path)
    }, state.console, ownProps)
  }, {
    hideModal,
    showModal,
    deleteDataset,
    renameDataset,
    updateDataset,
    addDataset,
    loadDatasets,
    loadDatasetBody,
    loadDatasetByName,
    loadDatasetByPath,
    loadProfileByName,
    togglePublishDataset,
    editDataset,
    loadRegistryDatasetByName,
    loadRegistryDatasetByPath
  }
)(Dataset, 'Dataset')

export default DatasetContainer
