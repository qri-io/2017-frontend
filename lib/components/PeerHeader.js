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
          <div className='peerItem' >
            { peer.name ? <b className={css('name')}>{peer.name}</b> : undefined }
            <h3 className='title'>{peer.username || 'unnamed peer'}</h3>
            <p className={css('path')}>{peer.id}</p>
            <div className={css('info')}>
              <div className={css('left')}>
                { peer.email ? <p className={css('detail')}><b className={css('name')}>EMAIL:</b> {peer.email}</p> : undefined }
                { peer.twitter ? <p className={css('detail')}><b className={css('name')}>TWITTER:</b> {peer.twitter}</p> : undefined }
                { peer.homeUrl ? <p className={css('detail')}><b className={css('name')}>WEBSITE:</b> {peer.homeUrl}</p> : undefined }
              </div>
              <div className={css('right')}>
                { peer.description ? <p className={css('detail')}><b className={css('name')}>ABOUT ME: </b>{peer.description}</p> : undefined}
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      item: {
        width: '100%',
        overflow: 'auto'
      },
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"',
        fontWeight: '300'
      },
      detail: {
        // fontSize: '.7rem',
        marginBottom: '5px'
      },
      path: {
        color: palette.path
      },
      info: {
        overflow: 'scroll'
      },
      left: {
        width: '30%',
        display: 'inline-block',
        minWidth: '350px',
        float: 'left'
      },
      right: {
        maxWidth: '600px',
        minWidth: '200px',
        display: 'inline-block'
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
