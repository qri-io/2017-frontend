import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

export default class StatItem extends Base {
  template (css) {
    const { data: stat, style } = this.props
    return (
      <div className={css('wrap')} style={style} >
        <div className={css('iconWrap')}><span className='iconInline' >{stat.icon}</span></div>
        <div className={css('textWrap')}>
          <div className={css('title')}><p className={css('noMargin')}>{stat.title}</p></div>
          <h1 className={css('noMargin')}>{stat.stat}</h1>
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        marginBottom: 15
      },
      iconWrap: {
        display: 'inline-block',
        marginTop: 4,
        float: 'left'
      },
      textWrap: {
        marginLeft: 5,
        display: 'inline-block'
      },
      noMargin: {
        margin: 0
      }
    }
  }
}

StatItem.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatItem.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
