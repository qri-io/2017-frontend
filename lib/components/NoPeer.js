/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

import PageHeader from './PageHeader'
import ReadOnlyHeader from './ReadOnlyHeader'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class NoPeer extends Base {
  constructor (props) {
    super(props);

    [
      'renderHeader'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderHeader () {
    const { onGoBack, sessionPeer } = this.props
    if (sessionPeer) {
      return <PageHeader
        onGoBack={onGoBack}
        />
    } else {
      return <ReadOnlyHeader
        onGoBack={onGoBack}
        />
    }
  }

  template (css) {
    return (
      <div>
        { this.renderHeader() }
        <div className={css('page')}>
          <div className={css('center')}>
            <h3>Peer '{this.props.peername}' not found or cannot be loaded</h3>
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette, sessionPeer } = props
    const left = sessionPeer ? 80 : 0
    return {
      page: {
        background: defaultPalette.background,
        position: 'absolute',
        width: '100%',
        minHeight: 1000,
        left: left,
        top: 100
      },
      center: {
        width: 300,
        height: 300,
        margin: '10em auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        textAlign: 'center'
      }
    }
  }
}

NoPeer.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  peername: PropTypes.string.isRequired,
  sessionPeer: PropTypes.string,
  palette: Palette
}

NoPeer.defaultProps = {
  palette: defaultPalette
}
