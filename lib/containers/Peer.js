import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal } from '../actions/app'
import { loadPeerNamespace, loadPeers } from '../actions/peers'
import { selectPeerNamespace, selectNoPeerNamespace, selectPeerNamespaceIsFetching, selectPeerNamespacePageCount, selectPeerNamespaceFetchedAll, selectPeerById, selectConnected } from '../selectors/peers'
import { addDataset } from '../actions/dataset'

const PeerContainer = connect(
  (state, ownProps) => {
    const path = ownProps.match.params.id
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
      path,
      goBack: ownProps.history.goBack,
      peer: selectPeerById(state, path),
      namespace: selectPeerNamespace(state, path),
      noNamespace: selectNoPeerNamespace(state, path),
      loading: selectPeerNamespaceIsFetching(state, path),
      nextPage: selectPeerNamespacePageCount(state, path) + 1,
      fetchedAll: selectPeerNamespaceFetchedAll(state, path),
      connected: selectConnected(state, path),
      topBox,
      bottomBox
    }, ownProps)
  }, {
    addDataset,
    showModal,
    loadPeerNamespace,
    loadPeers
  }
)(Peer, 'Peer')

export default PeerContainer
