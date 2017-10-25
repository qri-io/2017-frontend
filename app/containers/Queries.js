import { connect } from 'react-redux'

import { loadQueries, setQuery } from '../actions/query'
import { setTopPanel } from '../actions/console'
import { selectQueries } from '../selectors/query'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'

import Queries from '../components/Queries'

const QueriesContainer = connect(
  (state, ownProps) => {
    const pagination = state.pagination.popularQueries
    const paginationSection = 'popularQueries'
    const searchString = 'popularQueries'
    return Object.assign({
      queries: selectQueries(state, paginationSection, searchString),
      loading: selectIsFetching(state, paginationSection, searchString),
      nextPage: selectPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, searchString)
    }, ownProps)
  }, {
    loadQueries,
    setTopPanel,
    setQuery
  }
)(Queries, 'Queries')

export default QueriesContainer
