import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class TagItem extends Base {
  render () {
    const { tag } = this.props

    return (<div className='tag-item-pill'>{tag}</div>)
  }
}

TagItem.propTypes = {
  tag: PropTypes.string
  // add in when we move styling to scss
  // color: PropTypes.string
}

TagItem.defaultProps = {
  // color: 'a'
}
