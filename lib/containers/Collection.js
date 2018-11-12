import { connect } from 'react-redux'

import { showModal, clearPaginationIds } from '../actions/app'
import { loadDatasets, addDataset } from '../actions/dataset'
import { selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectSessionProfileId, selectSessionDatasetsCount, selectSessionRepoSize } from '../selectors/session'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'

import Collection from '../components/Collection'

const CollectionContainer = connect(
  (state, ownProps) => {
    const sessionProfileId = selectSessionProfileId(state)
    const paginationSection = 'popularDatasets'
    const paginationNode = sessionProfileId
    return Object.assign({
      sessionProfileId,
      datasets: selectDatasets(state, paginationSection, paginationNode),
      noDatasets: selectNoDatasets(state, paginationSection, paginationNode),
      loading: selectIsFetching(state, paginationSection, paginationNode),
      nextPage: selectPageCount(state, paginationSection, paginationNode) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, paginationNode),
      datasetsCount: selectSessionDatasetsCount(state),
      repoSize: selectSessionRepoSize(state)
    }, ownProps)
  }, {
    addDataset,
    // TODO - restore search
    // setDatasetSearch,
    // runDatasetSearch,
    showModal,
    loadDatasets,
    clearPaginationIds
  }
)(Collection, 'Collection')

export default CollectionContainer

// if there is a search string, turn false only if loading is false or noDatasets is true
