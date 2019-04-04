import React from 'react'

import PropTypes from 'prop-types'
import Button from '../chrome/Button'
import Base from '../Base'

export default class Export extends Base {
  render () {
    const { exportPath } = this.props

    return (
      <div className='export-wrap'>
        <Button color='a' download={exportPath} downloadName={exportPath} large text='Export your dataset!' />
      </div>
    )
  }
}

Export.propTypes = {
  exportPath: PropTypes.string
}

Export.defaultProps = {
}
