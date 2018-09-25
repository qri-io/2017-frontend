import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class Swatch extends Base {
  template (css) {
    const { style, title, hex } = this.props
    return (
      <div className={css('wrap')}>
        <div className={css('swatch')} style={style} />
        <p>{title}</p>
        <p>{hex}</p>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        marginLeft: 20,
        display: 'inline-block'
      },
      swatch: {
        height: 140,
        width: 140,
        marginBottom: 5
      }
    }
  }
}

Swatch.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  hex: PropTypes.string
}
