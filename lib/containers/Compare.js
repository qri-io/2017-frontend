import { connect } from 'react-redux'

import { fetchDiff } from '../actions/diff'
import { loadDatasetByName } from '../actions/dataset'

import {
  selectDatasetByName
} from '../selectors/dataset'

import Compare from '../components/compare/Compare'

const CompareContainer = connect(
  (state, ownProps) => {
    let src = selectDatasetByName(state, 'b5', 'awesome_csv')
    if (src && src.dataset) {
      src = src.dataset
    }

    return Object.assign({}, state.diff, {
      src
    }, ownProps)
  }, {
    loadDatasetByName,
    fetchDiff
  }
)(Compare, 'Compare')

export default CompareContainer
