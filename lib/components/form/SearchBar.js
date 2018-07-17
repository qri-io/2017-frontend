import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class SearchBar extends Base {
  template (css) {
    const { location, onChange } = this.props
    return (
      <div className={css('searchbar')}>
        <input className={css('input')} onChange={onChange} value={location} />
      </div>
    )
  }

  styles () {
    return {
      searchbar: {
        flex: '2 2 940px'
      },
      input: {
        width: '96%',
        border: 'none',
        borderRadius: 3,
        margin: '7px 2% 4px 2%',
        padding: '4px 10px',
        height: 32,
        ':focus': {
          outline: 'none'
        }
      }
    }
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  location: PropTypes.string
}

SearchBar.defaultProps = {
}
