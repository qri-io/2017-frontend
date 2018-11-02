import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadProfiles } from '../actions/profiles'
import { selectProfiles } from '../selectors/profiles'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
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
      // TODO: list the peer's datasets
      datasets: [],
      datasetsLoading: false,
      datasetsFetchedAll: true,
      nextPage: selectPageCount(state, paginationSection, searchString) + 1
    }, ownProps)
  }, {
    showModal,
    loadProfiles
  }
)(Network, 'Network')

export default NetworkContainer
