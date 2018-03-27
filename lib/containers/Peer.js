import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal, hideModal } from '../actions/app'
import { loadPeerById, loadPeerByName } from '../actions/peers'
import { selectDatasetSearchString, selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectError, selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectConnected, selectPeerById, selectPeerIdByName } from '../selectors/peers'
import { selectSessionPeer, selectSessionPeername } from '../selectors/session'
import { addDataset, loadDatasets } from '../actions/dataset'

const PeerContainer = connect(
  (state, ownProps) => {
    const sessionPeer = selectSessionPeer(state)
    var peername = ownProps.match.params.peername
    const id = ownProps.match.params.id
    if (sessionPeer && peername === 'me') {
      peername = selectSessionPeername(state)
    }
    const peerid = peername ? selectPeerIdByName(state, peername) : id || selectSessionPeer(state)
    const searchString = selectDatasetSearchString(state)
    const paginationSection = searchString ? 'searchedDatasets' : 'popularDatasets'
    const paginationNode = searchString || peerid
    return Object.assign({
      peername,
      peerid,
      sessionPeer: selectSessionPeer(state),
      goBack: ownProps.history.goBack,
      peer: selectPeerById(state, peerid),
      datasets: selectDatasets(state, paginationSection, paginationNode),
      noDatasets: selectNoDatasets(state, paginationSection, paginationNode),
      loading: selectIsFetching(state, paginationSection, paginationNode),
      nextPage: selectPageCount(state, paginationSection, paginationNode) + 1,
      fetchedAll: selectFetchedAll(state, paginationSection, paginationNode),
      error: selectError(state, paginationSection, paginationNode),
      connected: selectConnected(state, peerid)
    }, ownProps)
  }, {
    loadDatasets,
    addDataset,
    hideModal,
    showModal,
    loadPeerById,
    loadPeerByName
  }
)(Peer, 'Peer')

export default PeerContainer
