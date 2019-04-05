import React from 'react'
import PropTypes from 'prop-types'

import Button from './chrome/Button'

export default class PageTitle extends React.PureComponent {
  render () {
    const { pageTitle, sectionTitle, buttonText, onClick } = this.props

    return (
      <div className='sectionWidth headerHeight page-title-wrap'>
        <div className='page-wrap-title'>{pageTitle && <h1>{pageTitle}</h1>}</div>
        {buttonText && onClick && <Button onClick={onClick} text={buttonText} />}
        {sectionTitle && <div className='linkLarge'>{sectionTitle}</div>}
      </div>
    )
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
