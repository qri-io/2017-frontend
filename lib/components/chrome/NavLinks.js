import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

// NavLinks component is used in the Dataset and Editor to naviate around
// the different sections of a Dataset
const NavLinks = ({ url, linkList, sm }) => {
  // style based on sm or normal
  const margin = sm ? 'nav-links-link-sm' : 'nav-links-link'
  const marginRight = sm ? 10 : 15
  const className = sm ? 'linkMediumMuted' : 'linkLargeMuted'
  const activeClassName = sm ? 'linkMedium' : 'linkLarge'
  return (
    <div className='nav-links-wrap' >
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

NavLinks.propTypes = {
  // linkList: array of objects that includes the link and the display name
  linkList: PropTypes.arrayOf(
    PropTypes.shape(
      {
        link: PropTypes.string,
        name: PropTypes.string
      }
    )
  ).isRequired,
  // url: the base url that the link links to
  url: PropTypes.string.isRequired,
  // sm: when sm is true, the NavLinks have a smaller formatting
  sm: PropTypes.bool
}

export default NavLinks
