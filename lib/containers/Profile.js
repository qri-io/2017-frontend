import { connect } from 'react-redux'

import Profile from '../components/profile/Profile'
import { showModal, hideModal } from '../actions/app'
import { loadProfileById, loadProfileByName } from '../actions/profiles'
import { setProfilePoster, setProfilePhoto, loadSessionProfile } from '../actions/session'
import { selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectError, selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectProfileById, selectProfileIdByName } from '../selectors/profiles'
import { selectSessionProfileId, selectSessionProfileHandle } from '../selectors/session'
import { addDataset, loadDatasets } from '../actions/dataset'

const NetworkContainer = connect(
  (state, ownProps) => {
    const sessionProfileID = selectSessionProfileId(state)
    const sessionProfileHandle = selectSessionProfileHandle(state)
    // were we directed here from the /profile endpoint?
    // if so, we should use the id a peername from the session
    const profile = (ownProps.match.url === '/profile') || (ownProps.match.params.peername && ownProps.match.params.peername === sessionProfileHandle)

    var peername = profile ? sessionProfileHandle : ownProps.match.params.peername
    const id = ownProps.match.params.id
    const profileID = id || profile ? sessionProfileID : selectProfileIdByName(state, peername)
    const paginationSection = 'popularDatasets'
    const paginationNode = profileID
    return Object.assign({
      peer: !profile,
      peername,
      profileID,
      sessionProfileID: selectSessionProfileId(state),
      goBack: ownProps.history.goBack,
      profile: selectProfileById(state, profileID),
      datasets: selectDatasets(state, paginationSection, paginationNode),
      noDatasets: selectNoDatasets(state, paginationSection, paginationNode),
      loading: selectIsFetching(state, paginationSection, paginationNode),
      nextPage: selectPageCount(state, paginationSection, paginationNode) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, paginationNode),
      error: selectError(state, paginationSection, paginationNode)
    }, ownProps)
  }, {
    loadDatasets,
    addDataset,
    hideModal,
    showModal,
    loadProfileById,
    loadProfileByName,
    setProfilePoster,
    setProfilePhoto,
    loadSessionProfile
  }
)(Profile, 'Profile')

export default NetworkContainer
