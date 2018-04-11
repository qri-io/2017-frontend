import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadProfiles, connections } from '../actions/profiles'
import { selectProfiles } from '../selectors/profiles'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectSessionProfileId } from '../selectors/session'

import Profiles from '../components/Profiles'

const ProfilesContainer = connect(
  (state, ownProps) => {
    // const searchString = selectProfileSearchString(state)
    const paginationSection = 'popularProfiles'
    const searchString = 'popularProfiles'
    return Object.assign({
      sessionProfile: selectSessionProfileId(state),
      profiles: selectProfiles(state, paginationSection, searchString),
      loading: selectIsFetching(state, paginationSection, searchString),
      nextPage: selectPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, searchString)
    }, ownProps)
  }, {
    connections,
    showModal,
    loadProfiles
  }
)(Profiles, 'Profiles')

export default ProfilesContainer
