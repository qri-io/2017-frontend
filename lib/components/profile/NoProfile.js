import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'

import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class NoProfile extends Base {
  constructor (props) {
    super(props);

    [
      'renderHeader'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  template (css) {
    const session = this.props.sessionProfileId ? 'session' : 'noSession'
    return (
      <div>
        <Header text='No Profile' />
        <div className={css('page', session)}>
          <div className={css('center')}>
            <h3>Profile '{this.props.peername}' not found or cannot be loaded</h3>
          </div>
        </div>
      </div>
    )
  }

  styles () {
    return {
      page: {
        background: defaultPalette.background,
        position: 'absolute',
        width: '100%',
        minHeight: 1000,
        top: 100
      },
      noSession: {
        left: 0
      },
      session: {
        left: 80
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
  sessionProfileId: PropTypes.string
}

NoProfile.defaultProps = {
}
