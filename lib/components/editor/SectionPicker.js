import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export default class SectionPicker extends React.PureComponent {
  render () {
    const { links, current } = this.props

    return (
      <div className='section-picker-wrap'>
        <div>
          {links.map((link, i) => (
            <span key={i}>
              <NavLink to={link.url} className={(link.url === current) ? 'section-picker-link section-picker-current' : 'section-picker-link'}>{link.title}</NavLink>
            </span>)
          )}
        </div>
      </div>
    )
  }
}

SectionPicker.propTypes = {
  current: PropTypes.string,
  links: PropTypes.array
}

SectionPicker.defaultProps = {
  links: []
}
