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

import Base from './Base'

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
      'handleGoBack'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!this.props.namespace.length) {
      console.log(this.props.connected)
      if (this.props.connected) {
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
        this.setState({ message: 'Peer is not currently connected', loading: false })
      }
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

  changeTabIndex (index) {
    this.setState({tabIndex: index})
  }

  renderPeerDatasets (css, bottomBox) {
    const { namespace, palette } = this.props
    const { loading, message } = this.state
    if (loading) {
      return <Spinner />
    } else {
      return (
        <div className={css('overflow')} style={{height: `${bottomBox.height - 79}px`}}><List
          data={namespace}
          component={DatasetItem}
          // onSelectItem={this.onSelectDataset}
          emptyComponent={<p>{message}</p>}
          palette={palette}
          />
        </div>
      )
    }
  }

  template (css) {
    const { peer, topBox, bottomBox } = this.props
    const { tabIndex } = this.state
    return (
      <div className={css('wrap')}>
        <PeerHeader
          onGoBack={this.handleGoBack}
          bounds={topBox}
          peer={peer}
        />
        <TabPanel
          index={tabIndex}
          labels={['Datasets']}
          onSelectPanel={this.changeTabIndex}
          bounds={bottomBox}
          components={[
            this.renderPeerDatasets(css, bottomBox)
          ]}
          />
      </div>
    )
  }

  styles (props) {
    return {
      wrap: {
        paddingLeft: 20,
        paddingRight: 20
      },
      overflow: {
        overflow: 'auto'
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
