import React from 'react'

import PropTypes from 'prop-types'

import Base from './Base'

export default class Export extends Base {
  template (css) {
    const { exportPath } = this.props

    return (
      <div className={css('wrap')}>
        <a href={exportPath}>Export your dataset!!!</a>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        marginTop: 40
      }
    }
  }
}

Export.propTypes = {
  exportPath: PropTypes.string
}

Export.defaultProps = {
}
