import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class AppDrag extends Base {
  template (css) {
    const { style } = this.props

    return (
      <div id='header' className={css('header')} style={style} />
    )
  }

  styles () {
    return {
      header: {
        position: 'absolute',
        overflow: 'auto',
        '-webkit-app-region': 'drag',
        height: 40,
        width: '100%'
      }
    }
  }
}

AppDrag.propTypes = {
  style: PropTypes.object
}

AppDrag.defaultProps = {
}
