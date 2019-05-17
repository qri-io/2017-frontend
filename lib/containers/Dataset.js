import { connect } from 'react-redux'

import {
  deleteDataset,
  addDataset,
  loadDatasets,
  loadDatasetByPath,
  loadDatasetByName,
  renameDataset,
  togglePublishDataset,
  updateDataset
} from '../actions/dataset'

import {
  loadBody,
  clearBody
} from '../actions/body'

import {
  loadRegistryDatasetByName,
  loadRegistryDatasetByPath
} from '../actions/registry'

import {
  selectDatasetByPath,
  selectDatasetIdByName,
  selectDatasetBody,
  extractSchema,
  isLocalDataset
} from '../selectors/dataset'

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
    const body = selectDatasetBody(state, bodypath)
    const bodyLength = body ? Object.keys(body).length : 0
    return Object.assign({
      peername,
      name,
      sessionProfile,
      datasetRef,
      schema,
      path,
      bodypath,
      body,
      bodyLength,
      profile: selectProfileByName(state, peername),
      transfering: selectIsTransfering(state, path),
      noBody: bodyLength === 0 && state.body.fetchedAll,
      bodyLoading: state.body.loading,
      bodyError: state.body.error,
      bodyFetchedAll: state.body.fetchedAll,
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
    loadBody,
    clearBody,
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
