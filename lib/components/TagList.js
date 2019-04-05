import React from 'react'
import PropTypes from 'prop-types'
import TagItem from './item/TagItem'

export default class TagList extends React.PureComponent {
  render () {
    const { tags } = this.props

    return (
      <div className='tab-list-wrap'>
        {tags.map((tag, index) => <TagItem tag={tag} key={index} />)}
      </div>
    )
  }
}

TagList.propTypes = {
  tags: PropTypes.array
  // add in when we move styling to scss
  // color: PropTypes.string
}

TagList.defaultProps = {
  // color: 'a'
}
