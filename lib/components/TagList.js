import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import TagItem from './item/TagItem'

export default class TagList extends Base {
  template (css) {
    const { tags } = this.props

    return (
      <div className={css('wrap')}>
        {tags.map(tag => <TagItem tag={tag} />)}
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        margin: '10px 0'
      }
    }
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
