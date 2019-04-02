import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class AppDrag extends Base {
  render (css) {
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
