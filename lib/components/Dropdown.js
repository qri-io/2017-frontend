import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import Button from './Button'

export default class Dropdown extends Base {
  constructor (props) {
    super(props)
    this.state = {
      display: false
    };

    [
      'toggleMenu'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  toggleMenu () {
    const display = this.state.display
    this.setState({display: !display})
  }

  template (css) {
    const {color, onClick, loading, text, download, disabled} = this.props
    const className = 'btn btn-' + color

    const display = this.state.display

    return (
      <div className={'dropdown ' + css('dropdown')}>
        <div>
          <Button
            loading={loading}
            onClick={onClick}
            text={text}
            color={color}
            download={download}
            disabled={disabled}
            attached
          />
          <button
            className={`iconInline ${className} ${css('caret')} dropdown-toggle`}
            type='button'
            onClick={() => this.toggleMenu()}
          >
            dropdown
          </button>
        </div>
        <div>
          <this.props.dropdown display={display} />
        </div>
      </div>
    )
  }

  styles () {
    return {
      dropdown: {
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column'
      },
      caret: {
        borderRadius: '0 3px 3px 0',
        minWidth: 40,
        width: 40,
        paddingTop: 10,
        paddingLeft: 12

      }
    }
  }
}

Dropdown.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  dropdown: PropTypes.func,
  download: PropTypes.string
}

Dropdown.defaultProps = {
  color: 'a'
}
