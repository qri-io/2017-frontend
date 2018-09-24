import React from 'react'
import PropTypes from 'prop-types'

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
      <div className={css('searchbar')}>
        <span className={`icon-inline ${css('icon')}`}>search</span><input onChange={onChange} className={css('input')} value={this.state.search} onKeyUp={onKeyUp} />
      </div>
    )
  }

  styles () {
    return {
      searchbar: {
        flex: '2 3 940px',
        display: 'flex',
        width: '100%'
      },
      icon: {
        paddingTop: 13,
        marginRight: -5,
        flex: '1 0'
      },
      input: {
        width: '96%',
        border: 'none',
        borderRadius: 3,
        margin: '7px 10px 4px 10px',
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
  searchString: PropTypes.string
}

SearchBar.defaultProps = {
}
