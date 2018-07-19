import { connect } from 'react-redux'
import { parse } from 'query-string'

import { selectSessionProfileId } from '../selectors/session'
import { selectSearchResults } from '../selectors/search'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { runDatasetSearch } from '../actions/dataset'
import { history } from '../store/configureStore'

import SearchResults from '../components/SearchResults'

const SearchResultsContainer = connect(
  (state, ownProps) => {
    const sessionProfile = selectSessionProfileId(state)
    const searchParams = history && history.location && parse(history.location.search)
    const searchString = searchParams['q']

    const searchSection = 'searchedDatasets'

    return Object.assign({
      sessionProfile,
      searchString,
      searchResults: selectSearchResults(state, searchString),
      isFetching: selectIsFetching(state, searchSection, searchString),
      pageCount: selectPageCount(state, searchSection, searchString),
      fetchedAll: selectFetchedAll(state, searchSection, searchString)
    }, ownProps)
  }, {
    runDatasetSearch
  }
)(SearchResults, 'SearchResults')

export default SearchResultsContainer
