import { connect } from 'react-redux'
import { parse } from 'query-string'

import { selectSearchString } from '../selectors/app'
import { selectSessionProfileId } from '../selectors/session'
import { selectSearchResults } from '../selectors/search'
import { selectIsFetching, selectPageCount, selectFetchedAll, selectError } from '../selectors/pagination'
import { runDatasetSearch } from '../actions/dataset'

import SearchResults from '../components/SearchResults'

const SearchResultsContainer = connect(
  (state, ownProps) => {
    const { location } = ownProps
    const sessionProfile = selectSessionProfileId(state)
    const searchParams = location && parse(location.search)
    const searchString = searchParams['q'] || selectSearchString(state)

    const searchSection = 'searchedDatasets'

    return Object.assign({
      sessionProfile,
      searchString,
      searchResults: selectSearchResults(state, searchString),
      isFetching: selectIsFetching(state, searchSection, searchString),
      pageCount: selectPageCount(state, searchSection, searchString),
      fetchedAll: selectFetchedAll(state, searchSection, searchString),
      error: selectError(state, searchSection, searchString)
    }, ownProps)
  }, {
    runDatasetSearch
  }
)(SearchResults, 'SearchResults')

export default SearchResultsContainer
