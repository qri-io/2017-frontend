import { connect } from 'react-redux'

import { loadHistory } from '../actions/History'
import { selectHistory } from '../selectors/History'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectSessionProfileId } from '../selectors/session'

import Commits from '../components/Commits'

const CommitsContainer = connect(
  (state, ownProps) => {
    // const searchString = selectHistoryearchString(state)
    const paginationSection = 'datasetHistory'
    const searchString = ownProps.path
    return Object.assign({
      sessionProfile: selectSessionProfileId(state),
      history: selectHistory(state, paginationSection, searchString),
      loading: selectIsFetching(state, paginationSection, searchString),
      nextPage: selectPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, searchString)
    }, ownProps)
  }, {
    loadHistory
  }
)(Commits, 'History')

export default CommitsContainer
