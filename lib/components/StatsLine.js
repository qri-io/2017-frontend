import React from 'react'
import PropTypes from 'prop-types'

export default class StatsLine extends React.PureComponent {
  constructor (props) {
    super(props);
    [
      'renderStat',
      'parseDate'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  parseDate (datetime) {
    if (!datetime) {
      return 'no date given'
    }
    const date = new Date(datetime)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  renderStat (stat, index, style) {
    if (stat && stat.value && stat.name) {
      const num = stat.value > 1000 ? Math.round(stat.value / 1000) + 'K' : stat.value
      return <span key={index}><span>{num} {stat.name}</span><span className='stats-line-separated'>|</span></span>
    }
  }

  render () {
    const { stats, style, updated, published } = this.props
    return (
      <div className='statsLine stats-line-wrap'>
        <div className='stats-line-wrap-stats' style={style} >
          {stats.map((stat, index) => this.renderStat(stat, index))}
          {updated ? <span>{this.parseDate(updated)}</span> : undefined}
        </div>
        {published && <span>published</span>}
      </div>
    )
  }
}

StatsLine.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatsLine.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
