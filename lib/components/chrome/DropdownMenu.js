import React from 'react'
import PropTypes from 'prop-types'

export default class DropdownMenu extends React.PureComponent {
  render () {
    const { display, options, onChooseOption } = this.props
    return (
      <div className={`dropdown-menu ${display && 'dropdown-menu-block'}`}>
        {options.map((opt, i) => {
          return <a key={i} className='dropdown-item' onClick={onChooseOption.bind(this, opt)} >{opt}</a>
        })}
      </div>
    )
  }
}

DropdownMenu.propTypes = {
  options: PropTypes.array,
  onChooseOption: PropTypes.func,
  display: PropTypes.bool.isRequired
}

DropdownMenu.defaultProps = {
  options: ['Action', 'Another Action', 'Something else here'],
  onChooseOption: (opt) => { console.log('chose option:', opt) }
}
