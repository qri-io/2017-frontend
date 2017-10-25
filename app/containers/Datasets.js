import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadDatasets, setDatasetSearch, runDatasetSearch } from '../actions/dataset'
import { selectDatasetSearchString, selectNoDatasets, selectDatasets, selectDatasetsPageCount, selectDatasetsFetchedAll, selectDatasetsIsFetching } from '../selectors/dataset'

import Datasets from '../components/Datasets'

const DatasetsContainer = connect(
  (state, ownProps) => {
    const pagination = state.pagination.popularDatasets
    const searchString = selectDatasetSearchString(state)
    const paginationSection = searchString ? 'searchedDatasets' : ''
    return Object.assign({
      searchString,
      datasets: selectDatasets(state, paginationSection, searchString),
      noDatasets: selectNoDatasets(state, paginationSection, searchString),
      loading: selectDatasetsIsFetching(state, paginationSection, searchString),
      nextPage: selectDatasetsPageCount(state, paginationSection, searchString),
      fetchedAll: selectDatasetsFetchedAll(state, paginationSection, searchString),
      bounds: state.layout.main
    }, ownProps)
  }, {
    setDatasetSearch,
    runDatasetSearch,
    showModal,
    loadDatasets
  }
)(Datasets, 'Datasets')

export default DatasetsContainer
