import React from 'react'
import PropTypes from 'prop-types'
import { defaultPalette } from '../../propTypes/palette.js'

import Base from '../Base'

export default class SearchBar extends Base {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    };
    [
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentDidMount () {
    this.setState({ search: this.props.searchString })
  }

  static getDerivedStateFromProps (props, state) {
    const searchString = props && props.searchString
    const prevSearchString = state && state.search
    if (searchString !== prevSearchString) {
      return { search: searchString }
    }
    return null
  }

  template (css) {
    const { onKeyUp, onChange } = this.props
    return (
      <input onChange={onChange} className={css('input')} value={this.state.search} onKeyUp={onKeyUp} />
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      input: {
        width: 700,
        border: `${palette.textLight} solid 1px`,
        borderRadius: 10,
        padding: '4px 10px',
        flex: '1 4',
        height: 35,
        ':focus': {
          outline: 'none'
        }
      }
    }
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  searchString: PropTypes.string
}

SearchBar.defaultProps = {
}
