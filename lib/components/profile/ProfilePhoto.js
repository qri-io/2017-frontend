/* globals __BUILD__ */
import React from 'react'
import PropTypes from 'prop-types'

export default class ProfilePhoto extends React.PureComponent {
  render () {
    const { profile = {} } = this.props
    const { size } = this.props
    let side = { 'sm': 34, 'md': 64, 'lg': 100, 'xlg': 150 }[size]
    let borderRadius = { 'sm': 4, 'md': 6, 'lg': 8, 'xlg': 10 }[size]
    return (
      <div className='profile-photo-wrap' style={{
        backgroundImage: profile.photo ? `url("${__BUILD__.API_URL}${profile.photo}")` : '#111',
        width: side,
        height: side,
        borderRadius
      }} />
    )
  }
}

ProfilePhoto.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg']),
  profile: PropTypes.object
}

ProfilePhoto.defaultProps = {
  size: 'md'
}
