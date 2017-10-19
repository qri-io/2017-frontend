import React, { PropTypes } from 'react'

import { Palette, defaultPalette } from '../propTypes/palette'
import DatasetRefProps from '../propTypes/datasetRefProps'
import PeerProps from '../propTypes/peer'

import NavBar from './NavBar'
import PeerItem from './item/PeerItem'
import TabPanel from './TabPanel'
import List from './List'
import DatasetItem from './item/DatasetItem'
import Spinner from './Spinner'

import Base from './Base'

export default class Peer extends Base {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 0,
      loading: true
    };

    [
      'handleGoBack'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.namespace.length) {
      this.props.loadPeerNamespace(this.props.path, this.props.nextPage)
    } else {
      this.setState({loading: false})
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.loading && !nextProps.loading) {
      this.setState({loading: false})
    }
  }

  handleGoBack () {
    this.props.goBack()
  }

  template (css) {
    const { peer, namespace, palette } = this.props
    const { loading } = this.state
    return (
      <div className={css('wrap')}>
        <NavBar onGoBack={this.handleGoBack} />
        <PeerItem data={peer} />
        { loading ? <Spinner />
        : <List
          data={namespace}
          component={DatasetItem}
          // onSelectItem={this.onSelectDataset}
          emptyComponent={<p>No Datasets</p>}
          palette={palette}
          />
        }
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
  loadPeerNamespace: PropTypes.func.isRequired,
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
