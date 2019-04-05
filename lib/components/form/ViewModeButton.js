import React from 'react'
import PropTypes from 'prop-types'

export default class ViewModeButton extends React.PureComponent {
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
