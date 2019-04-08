import React from 'react'
import PropTypes from 'prop-types'

export default class StatsSection extends React.PureComponent {
  render () {
    const { stats } = this.props
    return (
      <div className='stats-section-wrap' >
        {stats.map((s, i) => {
          return (<span key={i} className='stats-section-stat-wrap' >
            <h1>{s.stat}</h1>
            <label>{s.title}</label>
          </span>)
        })}
      </div>
    )
  }
}

StatsSection.propTypes = {
  stats: PropTypes.array
}

StatsSection.defaultProps = {

}
