import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import Base from './Base'
import List from './List'
import PeerItem from './item/PeerItem'
import Spinner from './Spinner'
import StatItem from './item/StatItem'

export default class Peers extends Base {
  constructor (props) {
    super(props)
    // this.state = { loading: props.peers.length === 0 };
    this.state = {
      loading: !(props.fetchedAll || props.peers.length > 0)
    }

    this.debounceRunPeerSearch = debounce((searchString) => {
      this.setState({ loading: false })
      if (searchString) {
        this.props.runPeerSearch(searchString)
      }
    }
    , 250);

    [
      'onSelectPeer',
      'handlePeerSearch',
      'handleLoadNextPage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.skipLoad) {
      this.props.loadPeers()
      this.props.connections()
    } else if (this.state.loading === true && this.props.peers.length > 0) {
      console.log('in else if')
      this.setState({loading: false})
    }
  }

  componentWillReceiveProps (nextProps) {
    // if (this.state.loading === true && nextProps.peers.length > 0 && (this.props.peers.length === 0 || nextProps.noPeers)) {
    //   this.setState({ loading: false })
    // }
    if (this.state.loading === true && nextProps.loading === false) {
      this.setState({loading: false})
    }
  }

  onSelectPeer (index, peerRef) {
    console.log('Peer selected')
    // this.props.showModal(DATASET_DETAILS_MODAL, this, datasetRef, true)
  }

  handleLoadNextPage () {
    this.props.connections()
    this.props.loadPeers(this.props.nextPage)
  }

  handlePeerSearch (searchString) {
    this.props.setPeerSearch(searchString)
    this.setState({ loading: true })
    this.debounceRunPeerSearch(searchString)
  }

  template (css) {
    const { loading } = this.state
    const { peers, statItem } = this.props

    if (loading) {
      return (
        <div className={css('wrap')}>
          <header>
            {/* <input
              id={'search'}
              name={'search'}
              type={'text'}
              className='searchBox'
              value={searchString}
              placeholder={'search'}
              onChange={(e) => { this.handlePeerSearch(e.target.value) }}
            /> */}
            <hr />
          </header>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          <h1>Peers</h1>
          <hr />
        </header>
        <div className='col-md-8'>
          <List
            data={peers}
            component={PeerItem}
            onSelectItem={this.onSelectPeer}
            emptyComponent={<label>No Peers</label>}
            loading={this.props.loading}
            fetchedAll={this.props.fetchedAll}
            onClick={this.handleLoadNextPage}
            type='peers'
          />
        </div>
        <div className='col-md-4'>
          <List data={statItem} component={StatItem} />
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        marginTop: 40
      },
      header: {
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
  skipLoad: false,
  statItem: [
    {
      icon: 'flash',
      title: 'peers connected',
      stat: '2'
    },
    {
      icon: 'up',
      title: 'uptime',
      stat: '3:32:01'
    },
    {
      icon: 'link',
      title: 'transferred',
      stat: '2.4Gib'
    }]
}
