import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class StatsSection extends Base {
  template (css) {
    const { stats } = this.props
    return (
      <div className={css('wrap')} >
        {stats.map((s, i) => {
          return (<span key={i} className={css('statWrap')} >
            <h1>{s.stat}</h1>
            <label>{s.title}</label>
          </span>)
        })}
      </div>
    )
  }
  styles () {
    return {
      wrap: {
        padding: 20,
        display: 'flex',
        justifyContent: 'flex-end'
      },
      statWrap: {
        marginLeft: 40,
        textAlign: 'right'
      }
    }
  }
}

StatsSection.propTypes = {
  stats: PropTypes.array
}

StatsSection.defaultProps = {

}
