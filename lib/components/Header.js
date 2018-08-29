import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'
import NavLinks from './NavLinks'
import { defaultPalette } from '../propTypes/palette'

export default class Header extends Base {
  template (css) {
    const { text, leftChild, rightChild, linkList, url, smLink } = this.props

    return (
      <div className={css('wrap')}>
        <div className='datasetContent' >
          <div className={css('top')} >
            {leftChild || <h2 style={{color: 'white', marginTop: 10}}>{text}</h2>}
            {rightChild}
          </div>
          <div className={css('bottom')} >
            { url && linkList && <NavLinks url={url} linkList={linkList} sm={smLink} /> }
          </div>
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        width: '100%',
        height: 140,
        background: palette.text,
        display: 'flex',
        justifyContent: 'center'
      },
      top: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30
      }
    }
  }
}

Header.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape(
      {
        link: PropTypes.string,
        name: PropTypes.string
      }
    )
  ),
  text: PropTypes.string,
  leftChild: PropTypes.func,
  rightChild: PropTypes.func,
  smLink: PropTypes.bool
}

Header.defaultProps = {
}
