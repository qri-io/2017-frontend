import React from 'react'

import PropTypes from 'prop-types'
import Button from '../chrome/Button'
import Base from '../Base'

export default class Export extends Base {
  template (css) {
    const { exportPath } = this.props

    return (
      <div className={css('wrap')}>
        <Button color='a' download={exportPath} downloadName={exportPath} large text='Export your dataset!' />
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
