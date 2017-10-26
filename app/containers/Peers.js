import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadPeers } from '../actions/peers'
import { selectPeers, selectPeersPageCount, selectPeersFetchedAll, selectPeersIsFetching } from '../selectors/peers'

import Peers from '../components/Peers'

const PeersContainer = connect(
  (state, ownProps) => {
    const pagination = state.pagination.popularPeers
    // const searchString = selectPeerSearchString(state)
    const paginationSection = ''
    const searchString = ''
    const bounds = state.layout.main
    return Object.assign({
      peers: selectPeers(state, paginationSection, searchString),
      loading: selectPeersIsFetching(state, paginationSection, searchString),
      nextPage: selectPeersPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectPeersFetchedAll(state, paginationSection, searchString)
    }, ownProps)
  }, {
    showModal,
    loadPeers
  }
)(Peers, 'Peers')

export default PeersContainer
