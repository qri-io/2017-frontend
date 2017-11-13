import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class Header extends Base {
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
        '-webkit-app-region': 'drag'
      }
    }
  }
}

Header.propTypes = {
  style: PropTypes.object
}

Header.defaultProps = {
}
