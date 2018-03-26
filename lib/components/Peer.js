import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'
import PeerProps from '../propTypes/peer'

import PeerHeader from './PeerHeader'
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
      tabIndex: 0
    };

    [
      'changeTabIndex',
      'renderPeerDatasets',
      'handleGoBack',
      'handleAddDataset',
      'handleShowAddPeerDatasetModal',
      'handleSetPosterPhoto',
      'handleSetProfilePhoto',
      'handleMessage'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.peerid) {
      this.props.loadPeerByName(this.props.peername)
    } else if (!this.props.peer) {
      this.props.loadPeerById(this.props.peerid, () => this.props.loadDatasets(this.props.peerid, () => {}, 1, 30))
    } else if (this.props.datasets.length === 0 && !this.props.noDatasets) {
      this.props.loadDatasets(this.props.peerid, () => {}, 1, 30)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.peerid) {
      this.props.loadPeerByName(nextProps.peername)
    } else if (!nextProps.peer || this.props.peerid !== nextProps.peerid) {
      this.props.loadPeerById(nextProps.peerid, () => this.props.loadDatasets(nextProps.peerid, () => {}, 1, 30))
    } else if (!nextProps.datasets.length === 0 && !this.props.noDatasets) {
      this.props.loadDatasets(nextProps.peerid, () => {}, 1, 30)
    }
  }

  handleGoBack () {
    this.props.goBack()
  }

  changeTabIndex (index) {
    this.setState({tabIndex: index})
  }

  handleSetPosterPhoto (files) {
    this.props.setPosterPhoto(files)
  }

  handleSetProfilePhoto (files) {
    this.props.setProfilePhoto(files)
  }

  handleShowAddPeerDatasetModal (datasetRef) {
    const data = {
      datasetRef,
      handleNameDataset: this.handleAddDataset,
      hideModal: this.props.hideModal
    }
    this.props.showModal(ADD_PEER_DATASET_MODAL, this, data, false)
  }

  handleAddDataset (currentName, newName, path) {
    this.props.addDataset(path, newName, '', '',
        () => {
          this.props.loadDatasets(this.props.peerid)
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

  handleMessage () {
    const { error, peer } = this.props
    let message = 'Peer has no Datasets'
    if (error.includes('routing: not found')) {
      message = `${peer.peername} is not currently connected`
    } else if (error) {
      message = 'Error loading Datasets. Check console for more info.'
    }
    return message
  }

  renderPeerDatasets (css) {
    const { datasets, palette } = this.props
    if (this.props.loading) {
      return <Spinner />
    } else {
      return (
        <div className={css('wrap')}><List
          data={datasets}
          component={DatasetItem}
          // onSelectItem={this.onSelectDataset}
          emptyComponent={<p>{this.handleMessage()}</p>}
          palette={palette}
          onAdd={this.handleShowAddPeerDatasetModal}
          />
        </div>
      )
    }
  }

  template (css) {
    const { peer, profile } = this.props
    const { tabIndex } = this.state

    if (!peer) {
      return (<Spinner />)
    }
    return (
      <div>
        <PeerHeader
          onGoBack={this.handleGoBack}
          setPosterPhoto={profile && this.handleSetPosterPhoto}
          setProfilePhoto={profile && this.handleSetProfilePhoto}
          peer={peer}
        />
        <div className={css('wrap')}>
          <div className={css('main')}>
            <div className={css('sidebar')} />
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
      },
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      }
    }
  }
}

Peer.propTypes = {
  profile: PropTypes.bool,
  loadPeerById: PropTypes.func.isRequired,
  loadDatasets: PropTypes.func.isRequired,
  setPosterPhoto: PropTypes.func,
  setProfilePhoto: PropTypes.func,

  peer: PeerProps,
  peername: PropTypes.string,
  peerid: PropTypes.string,
  datasets: PropTypes.arrayOf(DatasetRefProps),
  noNamespace: PropTypes.bool,
  loading: PropTypes.bool,
  nextPage: PropTypes.number,
  fetchedAll: PropTypes.bool,
  goBack: PropTypes.func.isRequired,
  palette: Palette

}

Peer.defaultProps = {
  palette: defaultPalette,
  profile: false
}
