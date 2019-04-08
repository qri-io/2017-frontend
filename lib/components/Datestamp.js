import React from 'react'
import PropTypes from 'prop-types'

export default class Datestamp extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'toSeconds',
      'toMinutes',
      'toHours',
      'toDays',
      'toWeeks',
      'toMonths',
      'toYears',
      'displayDate'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  toSeconds (milliseconds) {
    const seconds = Math.floor(milliseconds / 1000)
    return {
      number: seconds < 60 ? seconds : false,
      unit: seconds > 1 ? 'seconds' : 'second'
    }
  }

  toMinutes (milliseconds) {
    const minutes = Math.floor(milliseconds / 1000 / 60)
    return {
      number: minutes < 60 ? minutes : false,
      unit: minutes > 1 ? 'minutes' : 'minute'
    }
  }

  toHours (milliseconds) {
    const hours = Math.floor(milliseconds / 1000 / 60 / 60)
    return {
      number: hours < 24 ? hours : false,
      unit: hours > 1 ? 'hours' : 'hour'
    }
  }

  toDays (milliseconds) {
    const days = Math.floor(milliseconds / 1000 / 60 / 60 / 24)
    return {
      number: days < 7 ? days : false,
      unit: days > 1 ? 'days' : 'day'
    }
  }

  toWeeks (milliseconds) {
    const weeks = Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 7)
    return {
      number: weeks < 4 ? weeks : false,
      unit: weeks > 1 ? 'weeks' : 'week'
    }
  }

  toMonths (milliseconds) {
    const months = Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 30)
    return {
      number: months < 12 ? months : false,
      unit: months > 1 ? 'months' : 'month'
    }
  }

  toYears (milliseconds) {
    const years = Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 365)
    return {
      number: years,
      unit: years > 1 ? 'years' : 'year'
    }
  }

  displayDate (milliseconds) {
    const conversions = [
      this.toSeconds,
      this.toMinutes,
      this.toHours,
      this.toDays,
      this.toWeeks,
      this.toMonths,
      this.toYears
    ]
    for (var i = 0; i < conversions.length; i++) {
      const conversion = conversions[i](milliseconds)
      if (conversion.number) {
        return `${conversion.number} ${conversion.unit} ago`
      }
    }
    return `${milliseconds} milliseconds ago`
  }

  render () {
    const { dateString, muted, relative, style } = this.props
    var displayDate
    if (!dateString) {
      displayDate = 'No date information given'
    } else {
      const date = new Date(dateString)
      displayDate = date.toString()
      if (relative) {
        const now = new Date(Date.now())
        const diff = now - date
        displayDate = this.displayDate(diff)
      }
    }
    const displayMuted = muted ? 'datestamp-muted' : undefined
    return (
      <div className={`hash ${displayMuted}`} style={style}>{displayDate}</div>
    )
  }
}

Datestamp.propTypes = {
  style: PropTypes.object,
  dateString: PropTypes.string.isRequired,
  muted: PropTypes.bool,
  relative: PropTypes.bool
}

Datestamp.defaultProps = {
  style: {},
  muted: false,
  relative: false
}
