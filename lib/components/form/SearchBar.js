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

  componentWillMount () {
    this.setState({ search: this.props.searchString })
  }

  componentWillReceiveProps (nextProps) {
    const { searchString } = this.props
    const { searchString: nextSearchString } = nextProps
    if (searchString !== nextSearchString) {
      this.setState({ search: nextSearchString })
    }
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
