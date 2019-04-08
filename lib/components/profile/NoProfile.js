import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
export default class NoProfile extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'renderHeader'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  render () {
    const session = this.props.sessionProfileId ? 'no-profile-session' : 'no-profile-no-session'
    return (
      <div>
        <Header text='No Profile' />
        <div className={`no-profile-page ${session}`}>
          <div className='no-profile-center'>
            <h3>Profile '{this.props.peername}' not found or cannot be loaded</h3>
          </div>
        </div>
      </div>
    )
  }
}

NoProfile.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  peername: PropTypes.string.isRequired,
  sessionProfileId: PropTypes.string
}

NoProfile.defaultProps = {
}
