import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal } from '../actions/app'
import { loadPeers } from '../actions/peers'
import { addDataset, loadDatasets } from '../actions/dataset'
import { setProfilePhoto, setPosterPhoto } from '../actions/session'

import { selectNoPeerNamespace, selectPeerNamespaceIsFetching, selectPeerNamespacePageCount, selectPeerNamespaceFetchedAll, selectConnected } from '../selectors/peers'
import { selectSessionUser } from '../selectors/session'
import { selectDatasets } from '../selectors/dataset'

const ProfileContainer = connect(
  (state, ownProps) => {
    const user = selectSessionUser(state)
    const bounds = state.layout.main

    const topBox = {
      top: bounds.top,
      left: 0,
      width: bounds.width,
      height: bounds.height * 0.35,
      overflow: 'auto'
    }
    const bottomBox = {
      top: bounds.height * 0.35,
      left: 0,
      width: bounds.width,
      height: bounds.height * 0.65,
      overflow: 'auto'
    }

    return Object.assign({
      // TODO - this value must always be present, but on initial load we don't have a user object?
      path: user.id || 'fool!',
      goBack: ownProps.history.goBack,
      peer: user,
      namespace: selectDatasets(state, 'popularDatasets', 'popularDatasets'),
      noNamespace: selectNoPeerNamespace(state, user.id),
      loading: selectPeerNamespaceIsFetching(state, user.id),
      nextPage: selectPeerNamespacePageCount(state, user.id) + 1,
      fetchedAll: selectPeerNamespaceFetchedAll(state, user.id),
      connected: selectConnected(state, user.id),
      topBox,
      bottomBox
    }, ownProps)
  }, {
    addDataset,
    showModal,
    loadPeerNamespace: loadDatasets,
    loadPeers,
    setPosterPhoto,
    setProfilePhoto
  }
)(Peer, 'Peer')

export default ProfileContainer
