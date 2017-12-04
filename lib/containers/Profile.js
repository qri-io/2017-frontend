import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal } from '../actions/app'
import { loadPeers } from '../actions/peers'
import { addDataset, loadDatasets } from '../actions/dataset'
import { setProfilePhoto, setPosterPhoto, loadSessionUser } from '../actions/session'

import { selectConnected } from '../selectors/peers'
import { selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'

import { selectSessionUser } from '../selectors/session'

const ProfileContainer = connect(
  (state, ownProps) => {
    const user = selectSessionUser(state)
    const path = user && user.id
    const paginationSection = 'popularDatasets'
    const paginationNode = 'popularDatasets'
    return Object.assign({
      // TODO - this value must always be present, but on initial load we don't have a user object?
      path,
      goBack: ownProps.history.goBack,
      peer: user,
      namespace: selectDatasets(state, paginationSection, paginationNode),
      noNamespace: selectNoDatasets(state, paginationSection, paginationNode),
      loading: selectIsFetching(state, paginationSection, paginationNode),
      nextPage: selectPageCount(state, paginationSection, paginationNode) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, paginationNode),
      connected: selectConnected(state, path)
    }, ownProps)
  }, {
    loadPeer: loadSessionUser,
    addDataset,
    showModal,
    loadPeerNamespace: loadDatasets,
    loadPeers,
    setPosterPhoto,
    setProfilePhoto
  }
)(Peer, 'Peer')

export default ProfileContainer
