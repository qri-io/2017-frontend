import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class DropdownMenu extends Base {
  // constructor (props) {
  //   super(props);
  //   [
  //   ].forEach((m) => { this[m] = this[m].bind(this) })
  // }

  template (css) {
    const {name} = this.props
    return (
      <div className='dropdown-menu'
        ref={name}
      >
        <a className='dropdown-item' href='#'>Action</a>
        <a className='dropdown-item' href='#'>Another action</a>
        <a className='dropdown-item' href='#'>Something else here</a>
      </div>
    )
  }

  styles () {
    return {
    }
  }
}

DropdownMenu.propTypes = {
  name: PropTypes.string.isRequired
}

DropdownMenu.defaultProps = {
}
