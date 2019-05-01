import { connect } from 'react-redux'

import { loadHistoryByName } from '../actions/history'
import { selectHistory } from '../selectors/history'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectSessionProfileId } from '../selectors/session'

import Commits from '../components/dataset/Commits'

const CommitsContainer = connect(
  (state, ownProps) => {
    // const searchString = selectHistoryearchString(state)
    const paginationSection = 'datasetHistory'
    const searchString = `/${ownProps.peername}/${ownProps.name}`
    return Object.assign({
      sessionProfile: selectSessionProfileId(state),
      log: selectHistory(state, paginationSection, searchString),
      loading: selectIsFetching(state, paginationSection, searchString),
      nextPage: selectPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, searchString),
      hitBottom: state.app.hitBottom
    }, ownProps)
  }, {
    loadHistoryByName
  }
)(Commits, 'History')

export default CommitsContainer
