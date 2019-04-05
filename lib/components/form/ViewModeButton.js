import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class ViewModeButton extends Base {
  render () {
    const { mode, onClick, active } = this.props

    return (
      <div onClick={onClick} style={{ width: 40 }}>
        <span className={`view-mode-button-nav-button' ${active ? ' view-mode-button-active' : '  view-mode-button-inactive'}`}>
          {mode === 'viz' ? 'view' : 'form'}
        </span>
      </div>
    )
  }
}

ViewModeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['viz', 'dataset'])
}

ViewModeButton.defaultProps = {
}
