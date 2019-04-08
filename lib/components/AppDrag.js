import React from 'react'
import PropTypes from 'prop-types'

export default class AppDrag extends React.PureComponent {
  render () {
    const { style } = this.props

    return (
      <div id='header' className='app-drag-header' style={style} />
    )
  }
}

AppDrag.propTypes = {
  style: PropTypes.object
}

AppDrag.defaultProps = {
}
