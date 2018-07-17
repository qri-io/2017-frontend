import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class SearchBar extends Base {
  constructor (props) {
    super(props)
    this.state = {
      search: this.props.location
    };
    [
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillReceiveProps (nextProps) {
    const { searchString, location } = this.props
    const { nextSearchString, nextLocation } = nextProps
    if (searchString !== nextSearchString) {
      this.setState({search: nextSearchString})
    } else if (location !== nextLocation) {
      this.setState({search: nextLocation})
    }
  }

  template (css) {
    const { onKeyUp, onChange } = this.props
    return (
      <div className={css('searchbar')}>
        <input onChange={onChange} className={css('input')} value={this.state.search} onKeyUp={onKeyUp} />
      </div>
    )
  }

  styles () {
    return {
      searchbar: {
        flex: '2 3 940px'
      },
      input: {
        width: '96%',
        border: 'none',
        borderRadius: 3,
        margin: '7px 2% 4px 2%',
        padding: '4px 10px',
        height: 32,
        '-webkit-app-region': 'no-drag',
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
  location: PropTypes.string
}

SearchBar.defaultProps = {
}
