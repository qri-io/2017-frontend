import { connect } from 'react-redux'

import { showModal, clearPaginationIds } from '../actions/app'
import { loadDatasets, initDataset } from '../actions/dataset'
import { selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectSessionProfileId } from '../selectors/session'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'

import Editor from '../components/editor/Editor'

const EditorContainer = connect(
  (state, ownProps) => {
    const id = selectSessionProfileId(state)
    const paginationSection = 'popularDatasets'
    const paginationNode = id
    return Object.assign({
      id,
      datasets: selectDatasets(state, paginationSection, paginationNode),
      noDatasets: selectNoDatasets(state, paginationSection, paginationNode),
      loading: selectIsFetching(state, paginationSection, paginationNode),
      nextPage: selectPageCount(state, paginationSection, paginationNode) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, paginationNode)
    }, ownProps)
  }, {
    initDataset,
    // TODO - restore search
    // setDatasetSearch,
    // runDatasetSearch,
    showModal,
    loadDatasets,
    clearPaginationIds
  }
)(Editor, 'Editor')

export default EditorContainer

// if there is a search string, turn false only if loading is false or noDatasets is true
