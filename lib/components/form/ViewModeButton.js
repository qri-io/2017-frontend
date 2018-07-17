import React from 'react'
import PropTypes from 'prop-types'
import { defaultPalette } from '../../propTypes/palette'

import Base from '../Base'

export default class ViewModeButton extends Base {
  template (css) {
    const { mode, onClick, active } = this.props

    return (
      <div onClick={onClick} style={{ width: 40 }}>
        <span className={css('nav_button', active ? 'active' : 'inactive')}>
          {mode === 'viz' ? 'view' : 'form'}
        </span>
      </div>
    )
  }

  styles () {
    return {
      nav_button: {
        cursor: 'pointer',
        fontFamily: 'SSPika',
        display: 'inline-block',
        textAlign: 'center',
        width: 34,
        height: 30,
        margin: '8px auto',
        padding: '4px 0',
        color: defaultPalette.neutralMuted,
        borderRadius: 3,
        border: `2px solid ${defaultPalette.neutralMuted}`
      },
      active: {
        background: defaultPalette.a,
        boxShadow: '0 0 3px rgba(0,0,0,0.15)',
        border: `2px solid ${defaultPalette.a}`,
        color: defaultPalette.text
      },
      inactive: {
        background: 'transparent'
      }
    }
  }
}

ViewModeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['viz', 'dataset'])
}

ViewModeButton.defaultProps = {
}
