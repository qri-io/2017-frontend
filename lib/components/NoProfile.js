import React from 'react'
import PropTypes from 'prop-types'

import PageHeader from './PageHeader'
import ReadOnlyHeader from './ReadOnlyHeader'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class NoProfile extends Base {
  constructor (props) {
    super(props);

    [
      'renderHeader'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderHeader () {
    const { onGoBack, sessionProfile } = this.props
    if (sessionProfile) {
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
            <h3>Profile '{this.props.peername}' not found or cannot be loaded</h3>
          </div>
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette, sessionProfile } = props
    const left = sessionProfile ? 80 : 0
    return {
      page: {
        background: palette.background,
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

NoProfile.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  peername: PropTypes.string.isRequired,
  sessionProfile: PropTypes.string,
  palette: Palette
}

NoProfile.defaultProps = {
  palette: defaultPalette
}
