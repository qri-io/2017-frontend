import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import Button from './chrome/Button'

export default class PageTitle extends Base {
  template (css) {
    const { pageTitle, sectionTitle, buttonText, buttonLink } = this.props

    return (
      <div className={`sectionWidth headerHeight ${css('wrap')}`}>
        <div className={css('title')}>{pageTitle && <h1>{pageTitle}</h1>}</div>
        {buttonText && <Button link={buttonLink}>{buttonText}</Button>}
        {sectionTitle && <div className='linkLarge'>{sectionTitle}</div>}
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        padding: `30px 20px 20px 20px`
      },
      title: {
        height: 50,
        marginBottom: 10
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
