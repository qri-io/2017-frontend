import { connect } from 'react-redux'

import Profile from '../components/Profile'
import { showModal, hideModal } from '../actions/app'
import { loadProfileById, loadProfileByName } from '../actions/profiles'
import { selectDatasetSearchString, selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectError, selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectConnected, selectProfileById, selectProfileIdByName } from '../selectors/profiles'
import { selectSessionProfile, selectSessionProfilename } from '../selectors/session'
import { addDataset, loadDatasets } from '../actions/dataset'

const ProfileContainer = connect(
  (state, ownProps) => {
    const sessionProfile = selectSessionProfile(state)
    var peername = ownProps.match.params.peername
    const id = ownProps.match.params.id
    if (sessionProfile && peername === 'me') {
      peername = selectSessionProfilename(state)
    }
    const profileid = peername ? selectProfileIdByName(state, peername) : id || selectSessionProfile(state)
    const searchString = selectDatasetSearchString(state)
    const paginationSection = searchString ? 'searchedDatasets' : 'popularDatasets'
    const paginationNode = searchString || profileid
    return Object.assign({
      peername,
      profileid,
      sessionProfile: selectSessionProfile(state),
      goBack: ownProps.history.goBack,
      profile: selectProfileById(state, profileid),
      datasets: selectDatasets(state, paginationSection, paginationNode),
      noDatasets: selectNoDatasets(state, paginationSection, paginationNode),
      loading: selectIsFetching(state, paginationSection, paginationNode),
      nextPage: selectPageCount(state, paginationSection, paginationNode) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, paginationNode),
      error: selectError(state, paginationSection, paginationNode),
      connected: selectConnected(state, profileid)
    }, ownProps)
  }, {
    loadDatasets,
    addDataset,
    hideModal,
    showModal,
    loadProfileById,
    loadProfileByName
  }
)(Profile, 'Profile')

export default ProfileContainer
