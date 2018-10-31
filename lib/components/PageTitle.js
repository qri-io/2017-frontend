import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import Button from './chrome/Button'

export default class PageTitle extends Base {
  template (css) {
    const { pageTitle, sectionTitle, buttonText, buttonLink } = this.props

    return (
      <div className={`sectionWidth headerHeight ${css('wrap')}`}>
        {pageTitle && <h1>{pageTitle}</h1>}
        {buttonText && <Button link={buttonLink}>{buttonText}</Button>}
        {sectionTitle && <div className='linkLarge'>{sectionTitle}</div>}
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        marginTop: 30
      }
    }
  }
}

PageTitle.propTypes = {
  pageTitle: PropTypes.string,
  sectionTitle: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string
}

PageTitle.defaultProps = {
}
