import React from 'react'
import PropTypes from 'prop-types'

const DropdownMenu = ({ display, options, onChooseOption }) => {
  return (
    <div className={`dropdown-menu ${display && 'dropdown-menu-block'}`}>
      {options.map((opt, i) => {
        return <a key={i} className='dropdown-item' onClick={onChooseOption.bind(this, opt)} >{opt}</a>
      })}
    </div>
  )
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

export default DropdownMenu
