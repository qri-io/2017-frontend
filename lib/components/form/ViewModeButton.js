import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class ViewModeButton extends Base {
  template (css) {
    const { mode, onClick } = this.props

    return (
      <div onClick={onClick} style={{ width: 40 }}>
        <span className='icon' style={{ margin: 0, padding: '8px 0' }}>
          {mode == 'viz' ? 'view' : 'form'}
        </span>
      </div>
    )
  }

  styles () {
    return {}
  }
}

ViewModeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['viz', 'dataset'])
}

ViewModeButton.defaultProps = {
}
