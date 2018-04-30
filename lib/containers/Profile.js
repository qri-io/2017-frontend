import { connect } from 'react-redux'

import Profile from '../components/Profile'
import { showModal, hideModal } from '../actions/app'
import { loadProfileById, loadProfileByName } from '../actions/profiles'
import { setProfilePoster, setProfilePhoto } from '../actions/session'
import { selectDatasetSearchString, selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectError, selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectConnected, selectProfileById, selectProfileIdByName } from '../selectors/profiles'
import { selectSessionProfileId, selectSessionProfilename } from '../selectors/session'
import { addDataset, loadDatasets } from '../actions/dataset'

const ProfileContainer = connect(
  (state, ownProps) => {
    const sessionProfileId = selectSessionProfileId(state)
    const sessionProfilename = selectSessionProfilename(state)
    // were we directed here from the /profile endpoint?
    // if so, we should use the id a peername from the session
    const profile = (ownProps.match.url === '/profile') || (ownProps.match.params.peername && ownProps.match.params.peername === sessionProfilename)

    var peername = profile ? sessionProfilename : ownProps.match.params.peername
    const id = ownProps.match.params.id
    const profileid = id || profile ? sessionProfileId : selectProfileIdByName(state, peername)
    const searchString = selectDatasetSearchString(state)
    const paginationSection = searchString ? 'searchedDatasets' : 'popularDatasets'
    const paginationNode = searchString || profileid
    return Object.assign({
      peername,
      profileid,
      sessionProfileId: selectSessionProfileId(state),
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
    loadProfileByName,
    setProfilePoster,
    setProfilePhoto
  }
)(Profile, 'Profile')

export default ProfileContainer
