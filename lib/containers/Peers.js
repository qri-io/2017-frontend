import { connect } from 'react-redux'

import { showModal } from '../actions/app'
import { loadPeers } from '../actions/peers'
import { selectPeers } from '../selectors/peers'
import { selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'

import Peers from '../components/Peers'

const PeersContainer = connect(
  (state, ownProps) => {
    // const searchString = selectPeerSearchString(state)
    const paginationSection = 'popularPeers'
    const searchString = 'popularPeers'
    const bounds = state.layout.main
    return Object.assign({
      peers: selectPeers(state, paginationSection, searchString),
      loading: selectIsFetching(state, paginationSection, searchString),
      nextPage: selectPageCount(state, paginationSection, searchString) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, searchString),
      bounds
    }, ownProps)
  }, {
    showModal,
    loadPeers
  }
)(Peers, 'Peers')

export default PeersContainer
