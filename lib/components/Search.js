import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class Search extends Base {
  constructor (props) {
    super(props)
    this.state = {
      focus: false
    };
    [
      'setFocus',
      'setBlur'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  setFocus (e) {
    this.setState({focus: true})
  }

  setBlur (e) {
    this.setState({focus: false})
  }

  template (css) {
    const { searchString, onChange, style, large, border, placeholder } = this.props
    const { focus } = this.state
    const displayLarge = large ? 'large' : 'regular'
    const displayBorder = border ? 'border' : ''
    const showFocus = focus ? 'focus' : ''
    const iconFocus = focus ? 'iconFocus' : 'iconColor'
    return (
      <div className={`${css('wrap', displayLarge, displayBorder, showFocus)}`} style={style}>
        <span className={`iconInline ${css(iconFocus)}`}>search</span>
        <input
          id='search'
          name='search'
          type='text'
          className={`form-control ${css('searchBox')}`}
          value={searchString}
          placeholder={placeholder}
          onChange={(e) => { onChange(e.target.value) }}
          onFocus={(e) => this.setFocus(e)}
          onBlur={(e) => this.setBlur(e)}
          />
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        transition: 'all 0.25s',
        borderBottomColor: palette.gray,
        display: 'inline-block'
      },
      border: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid'
      },
      regular: {
        fontSize: 16
      },
      large: {
        fontSize: 22
      },
      iconFocus: {
        color: palette.a
      },
      iconColor: {
        color: palette.gray
      },
      focus: {
        borderBottomColor: palette.a
      },
      searchBox: {
        paddingLeft: 16,
        display: 'inline-block',
        width: 'calc(100% - 22px)',
        border: 'none'
      }
    }
  }
}

Search.propTypes = {
  searchString: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  placeholder: PropTypes.string
}

Search.defaultProps = {
  placeholder: 'search',
  style: {},
  large: false,
  muted: false,
  border: false
}
