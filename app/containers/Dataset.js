/* globals confirm */
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { downloadDataset, deleteDataset, loadDatasetData } from '../actions/dataset'
import { setQuery, runQuery, downloadQuery } from '../actions/query'

import { selectDataset, selectDatasetData } from '../selectors/dataset'
import { selectSessionUser } from '../selectors/session'

import Dataset from '../components/Dataset'

const DatasetContainer = connect(
  (state, ownProps) => {
    const path = ownProps.path || `/${ownProps.params.splat}`

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
    return Object.assign({
      path,
      datasetRef: selectDataset(state, path),
      data: selectDatasetData(state, path),
      results,
      permissions
    }, state.console, ownProps)
  }, {
    setQuery,
    runQuery,
    downloadQuery,
    downloadDataset,
    deleteDataset,
    loadDatasetData
  }
)(Dataset, 'Dataset')

export default DatasetContainer
