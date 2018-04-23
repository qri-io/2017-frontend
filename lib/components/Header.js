import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import Button from './Button'

export default class Header extends Base {
  template (css) {
    const { text, buttonText, link, buttonColor, onClick, hr } = this.props

    return (
      <div className={css('header')}>
        <div>
          <h1>{text}</h1>
        </div>
        <div>
          <Button color={buttonColor} text={buttonText} onClick={onClick} name='headerButton' link={link} />
        </div>
        { hr ? <hr className={css('hr')} /> : undefined }
      </div>
    )
  }

  styles () {
    return {
      header: {
        marginTop: 30,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      },
      hr: {
        width: '100%',
        marginTop: -5
      }
    }
  }
}

Header.propTypes = {
  style: PropTypes.object
}

Header.defaultProps = {
}
