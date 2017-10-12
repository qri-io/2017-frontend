import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadPeers } from '../actions/peers'
import { selectPeers } from '../selectors/peers'

import Peers from '../components/Peers'

const PeersContainer = connect(
  (state, ownProps) => {
    const pagination = state.pagination.popularPeers
    // const searchString = selectPeerSearchString(state)
    // const paginationSection = searchString ? 'searchedPeers' : ''
    return Object.assign({
      peers: selectPeers(state)
    }, ownProps)
  }, {
    showModal,
    loadPeers
  }
)(Peers, 'Peers')

export default PeersContainer
