import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import Button from './Button'

export default class Dropdown extends Base {
  constructor (props) {
    super(props)
    this.state = {
      btn: '',
      caret: '-dropdown',
      menu: '-dropdown-menu'
    };

    [
      'toggleMenu'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  toggleMenu (name) {
    // ref names
    const btnName = name + this.state.btn
    const caretName = name + this.state.caret
    const menuName = name + this.state.menu

    // since we are using the Button component, and not the button element,
    // we need to dig a little deeper to get the element we need.
    // both the button component and the button element have the same ref name:
    const btn = this.refs[btnName].refs[btnName]
    const top = btn.clientHeight + 3
    const btnWidth = btn.getBoundingClientRect().width

    const caret = this.refs[caretName]
    const caretWidth = caret.getBoundingClientRect().width

    const menu = this.refs[menuName].refs[menuName]

    if (menu.style.display === '') {
      caret.classList.add('active')

      menu.style.display = 'block'
      const menuWidth = menu.getBoundingClientRect().width
      const left = (btnWidth + caretWidth) - menuWidth

      menu.style.transform = `translate3d(${left}px, ${top}px, 0px)`
      menu.style.top = 0
      return
    }
    menu.style.display = ''
    caret.classList.remove('active')
    caret.blur()
  }

  template (css) {
    const {color, onClick, loading, text, name, download, disabled} = this.props
    const className = 'btn btn-' + color

    const btn = name + this.state.btn
    const caret = name + this.state.caret
    const menu = name + this.state.menu

    return (
      <div className='dropdown'>
        <Button
          loading={loading}
          onClick={onClick}
          text={text}
          name={btn}
          ref={btn}
          color={color}
          download={download}
          disabled={disabled}
          attached
          />
        <button
          className={`iconInline ${className} ${css('caret')} dropdown-toggle`}
          type='button'
          onClick={() => this.toggleMenu(name)}
          ref={caret}>dropdown</button>
        <this.props.dropdown ref={menu} name={menu} />
      </div>
    )
  }

  styles () {
    return {
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
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  dropdown: PropTypes.func,
  download: PropTypes.string
}

Dropdown.defaultProps = {
  color: 'a'
}
