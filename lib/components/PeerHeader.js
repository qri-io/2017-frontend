import React from 'react'
import PropTypes from 'prop-types'

import PeerItem from './item/DatasetItem'
import PageHeader from './PageHeader.js'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class PeerHeader extends Base {
  template (css) {
    const { onGoBack, peer, bounds } = this.props
    return (
      <div className='peerHeader' style={{height: bounds.height}}>
        <PageHeader
          onGoBack={onGoBack}
        />
        <div className={css('item')} style={{height: bounds.height - 41}}>
          <PeerItem data={peer} link={false} peer={peer} />
        </div>
      </div>
    )
  }

  styles (props) {
    return {
      item: {
        width: '100%',
        overflow: 'auto'
      }
    }
  }
}

PeerHeader.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  peer: PropTypes.object.isRequired,
  bounds: PropTypes.object.isRequired,
  palette: Palette
}

PeerHeader.defaultProps = {
  palette: defaultPalette
}
