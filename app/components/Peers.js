import React, { PropTypes } from 'react'
import { debounce } from 'lodash'

import Base from './Base'
import List from './List'
import PeerItem from './item/PeerItem'
import Spinner from './Spinner'

export default class Peers extends Base {
  constructor (props) {
    super(props)
    // this.state = { loading: props.peers.length === 0 };
    this.state = { loading: false }

    this.debounceRunPeerSearch = debounce((searchString) => {
      this.setState({ loading: false })
      searchString ? this.props.runPeerSearch(searchString) : undefined
    }
    , 250);

    [
      'onSelectPeer',
      'handlePeerSearch',
      'handleAddItem'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.skipLoad) {
      // this.props.loadPeers(this.props.nextPage)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.peers.length > 0 && this.props.peers.length === 0 || nextProps.noPeers) {
      this.setState({ loading: false })
    }
  }

  onSelectPeer (index, datasetRef) {
    this.props.showModal(DATASET_DETAILS_MODAL, this, datasetRef, true)
  }

  handleLoadNextPage () {
    // this.props.loadPeers(this.props.nextPage)
  }

  handleAddItem () {
    this.props.showModal(ADD_DATASET_MODAL, this, {}, true)
  }

  handlePeerSearch (searchString) {
    // console.log(searchString)
    this.props.setPeerSearch(searchString)
    this.setState({ loading: true })
    this.debounceRunPeerSearch(searchString)
  }

  template (css) {
    const { loading } = this.state
    const { peers, searchString } = this.props

    if (loading) {
      return (
        <div className='wrapper'>
          <header>
            <input
              id={'search'}
              name={'search'}
              type={'text'}
              className='searchBox'
              value={searchString}
              placeholder={'search'}
              onChange={(e) => { this.handlePeerSearch(e.target.value) }}
            />
            <button onClick={this.handleAddItem} className='btn btn-primary right'>Add</button>
            <hr />
          </header>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header>
          <h1>Peers</h1>
          <hr />
        </header>
        <List
          data={peers}
          component={PeerItem}
          onSelectItem={this.onSelectPeer}
          emptyComponent={<p>No Peers</p>} />
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      },
      searchBox: {
        display: 'inline-block',
        width: '50%',
        fontSize: '1rem',
        lineHeight: '1.25',
        color: '#55595c',
        backgroundColor: '#fff',
        border: '0.5px solid rgba(0, 0, 0, 0.15)',
        overflow: 'auto',
        borderRadius: '0.25rem',
        marginBottom: 10,
        paddingLeft: 8
      }
    }
  }
}

Peers.propTypes = {
  searchString: PropTypes.string,
  peers: PropTypes.array.isRequired,
  // nextPage: PropTypes.number.isRequired,
  fetchedAll: PropTypes.bool,
  loadPeers: PropTypes.func.isRequired,
  skipLoad: PropTypes.bool
}

Peers.defaultProps = {
  skipLoad: false
}
