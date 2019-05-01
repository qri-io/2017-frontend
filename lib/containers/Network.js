import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadProfiles } from '../actions/profiles'
import { loadRegistryDatasets } from '../actions/registry'
import { selectProfiles } from '../selectors/profiles'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import {
  selectRegistryListIsFetching,
  selectRegistryList,
  selectRegistryListFetchedAll,
  selectRegistryListError,
  selectRegistryListPageCount
} from '../selectors/registry'
import { selectSessionProfileId } from '../selectors/session'

import Network from '../components/Network'

const NetworkContainer = connect(
  (state, ownProps) => {
    // const searchString = selectProfileSearchString(state)
    const paginationSection = 'popularProfiles'
    const searchString = 'popularProfiles'
    return Object.assign({
      sessionProfile: selectSessionProfileId(state),
      profiles: selectProfiles(state, paginationSection, searchString),
      profilesLoading: selectIsFetching(state, paginationSection, searchString),
      profileFetchedAll: selectFetchedAll(state, paginationSection, searchString),
      profileNextPage: selectPageCount(state, paginationSection, searchString) + 1,
      // TODO: list the peer's datasets
      datasets: selectRegistryList(state),
      datasetsLoading: selectRegistryListIsFetching(state),
      datasetsFetchedAll: selectRegistryListFetchedAll(state),
      datasetsFetchedError: selectRegistryListError(state),
      datasetsNextPage: selectRegistryListPageCount(state) + 1,
      hitBottom: state.app.hitBottom
    }, ownProps)
  }, {
    showModal,
    loadProfiles,
    loadRegistryDatasets
  }
)(Network, 'Network')

export default NetworkContainer
