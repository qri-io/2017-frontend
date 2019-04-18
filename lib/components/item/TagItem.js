import React from 'react'
import PropTypes from 'prop-types'

const TagItem = ({ tag }) => {
  return <div className='tag-item-pill'>{tag}</div>
}

TagItem.propTypes = {
  tag: PropTypes.string
  // add in when we move styling to scss
  // color: PropTypes.string
}

TagItem.defaultProps = {
}

export default TagItem
