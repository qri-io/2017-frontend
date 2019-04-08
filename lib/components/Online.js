import React from 'react'
import PropTypes from 'prop-types'

export default class Online extends React.PureComponent {
  render () {
    const { online, style, small, blue } = this.props
    const className = small ? 'online-small' : 'online-regular'
    const iconStyle = online ? 'connected' : ''
    const textStyle = blue ? 'linkMedium' : ''
    return (
      <div className={className} style={style}>
        <span className={`icon-inline ${iconStyle} ${small ? 'online-small' : ''}`}>{online ? 'flash' : 'hyphen'}</span>
        <span className={`${textStyle} online-text`}>{ online ? '  online' : '  offline' }</span>
      </div>
    )
  }
}

Online.propTypes = {
  online: PropTypes.bool,
  style: PropTypes.object,
  small: PropTypes.bool
}

Online.defaultProps = {
}
