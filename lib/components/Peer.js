import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'
import PeerProps from '../propTypes/peer'

import PeerHeader from './PeerHeader'
import PeerSidebar from './PeerSidebar'
import TabPanel from './TabPanel'
import List from './List'
import DatasetItem from './item/DatasetItem'
import Spinner from './Spinner'
import NameDataset from './NameDataset'

import Base from './Base'

const ADD_PEER_DATASET_MODAL = 'ADD_PEER_DATASET_MODAL'

export default class Peer extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      loading: true,
      message: 'Peer has no Datasets'
    };

    [
      'changeTabIndex',
      'renderPeerDatasets',
      'handleGoBack',
      'handleAddDataset',
      'handleShowAddPeerDatasetModal'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    this.props.loadPeer(this.props.path)
    if (!this.props.namespace.length) {
      this.props.loadPeerNamespace(this.props.path, this.props.nextPage, 30, (error) => {
        let message = 'Peer has no Datasets'
        if (error && (error.toString() === 'routing: not found' || error.toString() === 'error sending message to peer: routing: not found')) {
          message = 'Peer is not currently connected'
        } else if (error) {
          message = 'Error loading Peer Datasets. Check console for more info.'
        }
        this.setState({message: message})
      })
    } else {
      this.setState({loading: false})
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.path !== nextProps.path) {
      this.props.loadPeer(this.props.path)
    }
    if (this.props.loading && !nextProps.loading) {
      this.setState({loading: false})
    }
  }

  handleGoBack () {
    this.props.goBack()
  }

  changeTabIndex (index) {
    this.setState({tabIndex: index})
  }

  handleShowAddPeerDatasetModal (datasetRef) {
    return () => {
      const data = {
        datasetRef,
        handleNameDataset: this.handleAddDataset,
        hideModal: this.props.hideModal
      }
      this.props.showModal(ADD_PEER_DATASET_MODAL, this, data, false)
    }
  }

  handleAddDataset (currentName, newName, path) {
    this.props.addDataset(path, newName, '', '',
        () => {
          this.props.loadDatasets()
          this.props.hideModal()
        })
  }

  modal (name, data = {}) {
    switch (name) {
      case ADD_PEER_DATASET_MODAL:
        return <NameDataset data={data} />
      default:
        return undefined
    }
  }

  renderPeerDatasets () {
    const { namespace, palette } = this.props
    const { loading, message } = this.state
    if (loading) {
      return <Spinner />
    } else {
      return (
        <div><List
          data={namespace}
          component={DatasetItem}
          // onSelectItem={this.onSelectDataset}
          emptyComponent={<p>{message}</p>}
          palette={palette}
          onAdd={this.handleShowAddPeerDatasetModal}
          />
        </div>
      )
    }
  }

  template (css) {
    const { peer, setPosterPhoto, setProfilePhoto } = this.props
    const { tabIndex } = this.state
    return (
      <div className={css('wrap')}>
        <PeerHeader
          onGoBack={this.handleGoBack}
          setPosterPhoto={setPosterPhoto}
          setProfilePhoto={setProfilePhoto}
          peer={peer}
        />
        <div className={css('main')}>
          <div className={css('sidebar')}>
            <PeerSidebar peer={peer} />
          </div>
          <div className={css('content')}>
            <TabPanel
              index={tabIndex}
              labels={['Datasets']}
              onSelectPanel={this.changeTabIndex}
              components={[
                this.renderPeerDatasets(css)
              ]}
              />
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    return {
      main: {
        marginTop: 40
      },
      content: {
        width: '70%',
        float: 'left',
        paddingLeft: 20,
        paddingRight: 20
      },
      sidebar: {
        width: '30%',
        float: 'right',
        paddingLeft: 20,
        paddingRight: 20
      }
    }
  }
}

Peer.propTypes = {
  loadPeer: PropTypes.func.isRequired,
  loadPeerNamespace: PropTypes.func.isRequired,
  setPosterPhoto: PropTypes.func,
  setProfilePhoto: PropTypes.func,

  peer: PeerProps,
  namespace: PropTypes.arrayOf(DatasetRefProps),
  noNamespace: PropTypes.bool,
  loading: PropTypes.bool,
  nextPage: PropTypes.number,
  fetchedAll: PropTypes.bool,
  path: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  palette: Palette

}

Peer.defaultProps = {
  palette: defaultPalette
}
