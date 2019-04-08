import React from 'react'
import PropTypes from 'prop-types'

export default class StatsBar extends React.PureComponent {
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

  renderStat (stat, space, index, style) {
    if (stat && stat.name) {
      const num = stat.value > 1000 ? Math.round(stat.value / 1000) + 'K' : stat.value
      return (
        <span key={index} className={space}>
          {num}
          <br /><label className='label'>{stat.name}</label>
        </span>
      )
    }
  }

  render () {
    const { stats, extraSpace, large, style, updated } = this.props
    const space = extraSpace ? 'extraSpace' : 'stats-bar-space'
    const font = large ? 'stats-large' : 'stats-medium'
    return (
      <div className={`stats-bar-wrap ${font}`} style={style} >
        {stats.map((stat, index) => this.renderStat(stat, space, index))}
        {updated ? <span className={space}>{this.parseDate(updated)}<br /><label>updated</label></span> : undefined}
      </div>
    )
  }
}

StatsBar.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  muted: PropTypes.bool,
  extraSpace: PropTypes.bool,
  style: PropTypes.object
}

StatsBar.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
