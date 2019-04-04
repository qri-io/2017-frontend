import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
import Button from './Button'

export default class Dropdown extends Base {
  constructor (props) {
    super(props)
    this.state = {
      display: false
    };

    [
      'toggleMenu',
      'onChooseOption'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  toggleMenu () {
    const display = this.state.display
    this.setState({ display: !display })
  }

  onChooseOption (opt) {
    this.setState({ display: false })
    this.props.onChooseOption(opt)
  }

  render () {
    const { color, onClick, loading, text, download, disabled, options } = this.props
    const className = 'btn btn-' + color

    const display = this.state.display

    return (
      <div className='dropdown dropdown-wrap'>
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
            className={`icon-inline ${className} dropdown-caret dropdown-toggle`}
            type='button'
            onClick={() => this.toggleMenu()}
          >
            dropdown
          </button>
        </div>
        <div>
          <this.props.dropdown display={display} options={options} onChooseOption={this.onChooseOption} />
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  options: PropTypes.array,
  onChooseOption: PropTypes.func,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  dropdown: PropTypes.func,
  download: PropTypes.string
}

Dropdown.defaultProps = {
  color: 'primary'
}
