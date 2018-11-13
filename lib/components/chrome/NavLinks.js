import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import Base from '../Base'

export default class NavLinks extends Base {
  template (css) {
    const { url, linkList, sm } = this.props

    // style based on sm or normal
    const margin = sm ? css('linkSm') : css('link')
    const marginRight = sm ? 10 : 15
    const className = sm ? 'linkMediumMuted' : 'linkLargeMuted'
    const activeClassName = sm ? 'linkMedium' : 'linkLarge'
    return (
      <div className={css('wrap')} >
        {
          linkList.map((item, index) => {
            return (
              <span
                key={index}
                id={item.name}
                style={{ marginRight: index === 0 ? marginRight : undefined, opacity: (!item.active && item.faded) ? 0.2 : 1.0 }}
                className={index === 0 ? '' : margin}>
                <NavLink
                  to={`${url === '/' ? '' : url}/${item.link}`}
                  className={`${item.active ? activeClassName : className}`} >
                  {item.name}
                </NavLink>
              </span>
            )
          })
        }
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 5
      },
      link: {
        margin: '0 15px'
      },
      linkSm: {
        margin: '0 10px'

      }
    }
  }
}

NavLinks.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape(
      {
        link: PropTypes.string,
        name: PropTypes.string
      }
    )
  ).isRequired,
  url: PropTypes.string.isRequired,
  sm: PropTypes.bool
}
