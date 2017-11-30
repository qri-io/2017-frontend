import React from 'react'
import PropTypes from 'prop-types'

import PageHeader from './PageHeader'
import ProfilePhoto from './ProfilePhoto'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class PeerHeader extends Base {
  template (css) {
    const { onGoBack, peer, bounds } = this.props
    return (
      <div className={css('wrap')}>
        <PageHeader
          onGoBack={onGoBack}
        />
        <div className={css('info')}>
          <div className={css('photo')}>
            <ProfilePhoto size='lg' peer={peer} />
          </div>
          <div className={css('username')}>
            <h1 className='title'>{peer.username || 'unnamed peer'}</h1>
            { /* peer.name ? <b className={css('name')}>{peer.name}</b> : undefined */ }
            <p className={css('path')}>{peer.id}</p>
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      wrap: {
        background: '#222',
        height: 300,
        position: 'relative'
      },
      info: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        ':after': {
          content: '',
          display: 'table',
          clear: 'both'
        }
      },
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"',
        fontWeight: '300'
      },
      photo: {
        float: 'left'
      },
      username: {
        float: 'left',
        marginTop: 30
      },
      path: {
        color: palette.path
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
