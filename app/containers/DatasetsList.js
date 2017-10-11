import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadDatasets, setDatasetSearch, runDatasetSearch } from '../actions/dataset'
import { selectDatasetSearchString, selectNoDatasets, selectDatasets, selectDatasetsPageCount, selectDatasetsFetchedAll, selectDatasetsIsFetching } from '../selectors/dataset'

import DatasetsList from '../components/DatasetsList'

const DatasetsListContainer = connect(
  (state, ownProps) => {
    const pagination = state.pagination.popularDatasets
    const searchString = selectDatasetSearchString(state)
    const paginationSection = searchString ? 'searchedDatasets' : ''
    return Object.assign({
      searchString,
      datasets: selectDatasets(state, paginationSection, searchString),
      noDatasets: selectNoDatasets(state, paginationSection, searchString),
      loading: selectDatasetsIsFetching(state, paginationSection, searchString),
      nextPage: selectDatasetsPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectDatasetsFetchedAll(state, paginationSection, searchString)
    }, ownProps)
  }, {
    setDatasetSearch,
    runDatasetSearch,
    showModal,
    loadDatasets
  }
)(DatasetsList, 'DatasetsList')

export default DatasetsListContainer
