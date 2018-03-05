import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal, hideModal } from '../actions/app'
import { loadPeer, loadPeerNamespace, loadPeers } from '../actions/peers'
import { selectPeerNamespace, selectNoPeerNamespace, selectPeerNamespaceIsFetching, selectPeerNamespacePageCount, selectPeerNamespaceFetchedAll, selectPeerById, selectConnected } from '../selectors/peers'
import { addDataset, loadDatasets } from '../actions/dataset'

const PeerContainer = connect(
  (state, ownProps) => {
    const path = ownProps.match.params.id
    return Object.assign({
      path,
      goBack: ownProps.history.goBack,
      peer: selectPeerById(state, path),
      namespace: selectPeerNamespace(state, path),
      noNamespace: selectNoPeerNamespace(state, path),
      loading: selectPeerNamespaceIsFetching(state, path),
      nextPage: selectPeerNamespacePageCount(state, path) + 1,
      fetchedAll: selectPeerNamespaceFetchedAll(state, path),
      connected: selectConnected(state, path)
    }, ownProps)
  }, {
    loadDatasets,
    addDataset,
    hideModal,
    showModal,
    loadPeerNamespace,
    loadPeers,
    loadPeer
  }
)(Peer, 'Peer')

export default PeerContainer
