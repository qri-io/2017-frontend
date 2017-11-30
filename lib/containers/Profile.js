import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal } from '../actions/app'
import { loadPeerNamespace, loadPeers } from '../actions/peers'
import { selectPeerNamespace, selectNoPeerNamespace, selectPeerNamespaceIsFetching, selectPeerNamespacePageCount, selectPeerNamespaceFetchedAll, selectPeerById, selectConnected } from '../selectors/peers'
import { addDataset } from '../actions/dataset'
import { selectSessionUser } from '../selectors/session'
import { loadDatasets } from '../actions/dataset'
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
    loadPeers
  }
)(Peer, 'Peer')

export default ProfileContainer
