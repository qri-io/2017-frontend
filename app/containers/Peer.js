import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal } from '../actions/app'
import { loadPeerNamespace, loadPeers } from '../actions/peers'
import { selectPeerNamespace, selectNoPeerNamespace, selectPeerNamespaceIsFetching, selectPeerNamespacePageCount, selectPeerNamespaceFetchedAll, selectPeerById } from '../selectors/peers'

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
      fetchedAll: selectPeerNamespaceFetchedAll(state, path)
    }, ownProps)
  }, {
    showModal,
    loadPeerNamespace,
    loadPeers
  }
)(Peer, 'Peer')

export default PeerContainer
