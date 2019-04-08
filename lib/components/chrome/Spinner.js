import React from 'react'

import PropTypes from 'prop-types'

export default class Spinner extends React.PureComponent {
  render () {
    const { center, button, white, large } = this.props
    return (
      <div className={`${button ? 'spinner-button' : 'spinner-spinner'} ${center && 'spinner-center'} ${!large && 'spinner-small'}`}>
        <div className={`spinner-block spinner-rect1 ${white ? 'spinner-white' : 'spinner-dark'}`} />
        <div className={`spinner-block spinner-rect2 ${white ? 'spinner-white' : 'spinner-dark'}`} />
        <div className={`spinner-block spinner-rect3 ${white ? 'spinner-white' : 'spinner-dark'}`} />
        <div className={`spinner-block spinner-rect4 ${white ? 'spinner-white' : 'spinner-dark'}`} />
        <div className={`spinner-block spinner-rect5 ${white ? 'spinner-white' : 'spinner-dark'}`} />
      </div>
    )
  }
}

Spinner.propTypes = {
  button: PropTypes.bool,
  center: PropTypes.bool.isRequired
}

Spinner.defaultProps = {
  center: true
}
