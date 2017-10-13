import { connect } from 'react-redux'

import { loadQueries, setQuery } from '../actions/query'
import { setTopPanel } from '../actions/console'
import { selectQueries, selectQueriesPageCount, selectQueriesFetchedAll, selectQueriesIsFetching } from '../selectors/query'

import Queries from '../components/Queries'

const QueriesContainer = connect(
  (state, ownProps) => {
    const pagination = state.pagination.popularQueries
    const paginationSection = ''
    const searchString = ''
    return Object.assign({
      queries: selectQueries(state, paginationSection, searchString),
      loading: selectQueriesIsFetching(state, paginationSection, searchString),
      nextPage: selectQueriesPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectQueriesFetchedAll(state, paginationSection, searchString)
    }, ownProps)
  }, {
    loadQueries,
    setTopPanel,
    setQuery
  }
)(Queries, 'Queries')

export default QueriesContainer
