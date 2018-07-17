import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Base from './Base'
import Header from './Header'

export default class SearchResults extends Base {
  constructor (props) {
    super(props);

    [
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  template (css) {
    return (
      <div className={css('wrap')} >
        <Header text='Search Results:' />
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        padding: '0 20px'
      }
    }
  }
}

SearchResults.propTypes = {
}

SearchResults.defaultProps = {
}
