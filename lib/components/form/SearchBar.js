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
        flex: '2 2 600px'
      },
      input: {
        width: '94%',
        border: 'none',
        borderRadius: 3,
        margin: '5px 3%',
        height: 30
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
