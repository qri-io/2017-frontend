import { connect } from 'react-redux'

import Peer from '../components/Peer'
import { showModal, hideModal } from '../actions/app'
import { loadPeer, loadPeers, loadPeerByName } from '../actions/peers'
import { selectDatasetSearchString, selectNoDatasets, selectDatasets } from '../selectors/dataset'
import { selectError, selectIsFetching, selectPageCount, selectFetchedAll } from '../selectors/pagination'
import { selectConnected, selectPeerById, selectPeerIdByName } from '../selectors/peers'
import { selectSessionPeer } from '../selectors/session'
import { addDataset, loadDatasets } from '../actions/dataset'

const PeerContainer = connect(
  (state, ownProps) => {
    const peername = ownProps.match.params.peername
    const id = ownProps.match.params.id
    const peerid = peername ? selectPeerIdByName(state, peername) : id || selectSessionPeer(state)
    const searchString = selectDatasetSearchString(state)
    const paginationSection = searchString ? 'searchedDatasets' : 'popularDatasets'
    const paginationNode = searchString || peerid
    return Object.assign({
      peername,
      peerid,
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
    loadPeers,
    loadPeer,
    loadPeerByName
  }
)(Peer, 'Peer')

export default PeerContainer
