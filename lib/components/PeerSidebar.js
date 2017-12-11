import React from 'react'
import PropTypes from 'prop-types'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'
import StatItemList from './StatItemList'

export default class PeerSidebar extends Base {
  template (css) {
    const { peer, statItemList } = this.props
    return (
      <div className={css('wrap')}>
        <div className={css('hr')} />
        <div className={css('info')}>
          <StatItemList stats={statItemList} style={{marginBottom: 40}} />
          { /* TODO - these links break errrrythang peer.homeUrl ? <p><a href={peer.homeUrl}>{peer.homeUrl}</a></p> : undefined */ }
          { peer.homeUrl ? <p>{peer.homeUrl}</p> : undefined }
          { /* TODO - peer.twitter ? <p><a href={`https://twitter.com/${peer.twitter}`}>{peer.twitter}</a></p> : undefined */ }
          { peer.twitter ? <p>{peer.twitter}</p> : undefined }
          { peer.email ? <p>{peer.email}</p> : undefined }
          { peer.description ? <p>{peer.description}</p> : undefined}
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      wrap: {
        marginTop: 40
      },
      hr: {
        borderTop: `1px solid ${palette.overlay}`,
        marginTop: 0
      },
      info: {
        marginTop: 20
      }
    }
  }
}

PeerSidebar.propTypes = {
  peer: PropTypes.object.isRequired,
  palette: Palette
}

PeerSidebar.defaultProps = {
  palette: defaultPalette,
  statItemList: [
    {
      title: 'dataset',
      stat: '14'
    },
    {
      title: 'time online',
      stat: '3:32:01'
    },
    {
      title: 'repo size',
      stat: '2.4Gib'
    }]
}
