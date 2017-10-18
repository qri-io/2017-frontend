import React, { PropTypes } from 'react'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'

import NavBar from './NavBar'
import PeerItem from './item/PeerItem'
import TabPanel from './TabPanel'
import List from './List'
import DatasetItem from './item/DatasetItem'

import Base from './Base'

export default class Peer extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      loading: false
    };

    [
      'handleGoBack'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.peers) {
      this.props.loadPeers()
    }
    if (!this.props.skipLoad) {
      this.props.loadPeerNamespace(this.props.path, this.props.nextPage)
    }
  }

  handleGoBack () {
    this.props.goBack()
  }

  template (css) {
    const { peer, namespace, palette } = this.props
    return (
      <div className={css('wrap')}>
        <NavBar onGoBack={this.handleGoBack} />
        <PeerItem data={peer} />
        <List
          data={namespace}
          component={DatasetItem}
          // onSelectItem={this.onSelectDataset}
          emptyComponent={<p>No Datasets</p>}
          palette={palette}
          />
      </div>
    )
  }

  styles (props) {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      }
    }
  }
}

Peer.propTypes = {
  path: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  palette: Palette

}

Peer.defaultProps = {
  palette: defaultPalette
}
