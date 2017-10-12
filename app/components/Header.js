import React, { PropTypes } from 'react'
import { Link } from 'react-router'

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
        '-webkit-app-region': 'drag'
      }
    }
  }
}

Header.propTypes = {
  style: PropTypes.object
  // onToggleMenu: PropTypes.func.isRequired,
}

Header.defaultProps = {
}
