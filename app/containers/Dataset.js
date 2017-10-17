/* globals confirm */
import { connect } from 'react-redux'

import { downloadDataset, deleteDataset, loadDatasetData, addDataset } from '../actions/dataset'
import { setQuery, runQuery, downloadQuery } from '../actions/query'

import { selectDataset, selectDatasetData } from '../selectors/dataset'
import { selectSessionUser } from '../selectors/session'

import Dataset from '../components/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    // console.log(ownProps.match.params)
    // const path = ownProps.path || `/${ownProps.params.splat}`
    const path = `/ipfs/${ownProps.match.params.id}/dataset.json`
    const user = selectSessionUser(state)
    const results = state.results[state.console.query.statement]
    let permissions = {
      edit: false,
      migrate: false,
      change: false
    }
    if (user && user.username === ownProps.params.user) {
      permissions.migrate = true
      permissions.change = true
    }
    const { datasetRef, peer } = selectDataset(state, path)
    return Object.assign({
      path,
      datasetRef,
      peer,
      data: selectDatasetData(state, path),
      results,
      permissions,
      history: ownProps.history,
      goBack: ownProps.history.goBack
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    downloadQuery,
    downloadDataset,
    deleteDataset,
    addDataset,
    loadDatasetData
  }
)(Dataset, 'Dataset')

export default DatasetContainer
