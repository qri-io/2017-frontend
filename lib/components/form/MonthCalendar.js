import React from 'react'
import PropTypes from 'prop-types'

/*
 *
 * Table-Based Month Calendar intended for use as
 * small day-picker. Uses state to change the month
 * being displayed
 */

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }

export default class MonthCalendar extends React.PureComponent {
  constructor (props) {
    super(props)

    let d = new Date(props.value)
    d.setDate(1)

    this.state = {
      displayMonth: d
    };

    [
      'monthString',
      'isValue',
      'onSelectDay',
      'onPrevMonth',
      'onNextMonth'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  // lifecycle

  // handlers
  onSelectDay (e) {
    e.preventDefault()
    let value = +e.target.getAttribute('data-value')
    let d = new Date(value)

    this.props.onChange(d)
  }
  onPrevMonth () {
    let d = this.state.displayMonth
    if (d.getMonth() > 0) {
      d.setMonth(d.getMonth() - 1)
    } else {
      d.setYear(d.getFullYear() - 1)
      d.setMonth(11)
    }

    this.setState({ displayMonth: d })
  }
  onNextMonth () {
    const d = this.state.displayMonth
    if (d.getMonth() < 11) {
      d.setMonth(d.getMonth() + 1)
    } else {
      d.setYear(d.getFullYear() + 1)
      d.setMonth(0)
    }

    this.setState({ displayMonth: d })
  }

  // methods
  monthString (d) {
    return months[d.getMonth()]
  }

  isValue (date) {
    const v = this.props.value
    return (
      v.getFullYear() === date.getFullYear() &&
      v.getMonth() === date.getMonth() &&
      v.getDate() === date.getDate()
    )
  }

  // Render
  render () {
    // const { value } = this.props;
    const { displayMonth } = this.state
    const { onMouseDown, onTouchEnd } = this.props

    let startDay = displayMonth.toString().split(' ')[0].toLowerCase()
    let offset = days[startDay]
    let weeks = []
    let week, wd, pos, c

    // Generate Table of Dates
    for (let w = 0; w < 6; w += 1) {
      week = []
      for (let d = 0; d < 7; d += 1) {
        // copy the date for manipulation
        wd = new Date(displayMonth)
        // determine grid position with i = x + (y * width)
        pos = d + (w * 7)
        wd.setDate(pos - (offset + 1))

        c = (wd.getMonth() === displayMonth.getMonth()) ? 'current' : ''
        if (this.isValue(wd)) {
          c += ' selected'
        }

        // Add buttons in as <a> tags to ensure click / touch events
        // are picked up
        week.push(
          <td
            onClick={this.onSelectDay}
            onTouchEnd={this.onSelectDay}
            className={c}
            key={d + (w * 7)}
            data-value={wd.valueOf()}
          >{wd.getDate()}</td>)
      }
      weeks.push(<tr key={w}>{week}</tr>)
    }

    return (
      <div className='month-calendar' onMouseDown={onMouseDown} onTouchEnd={onTouchEnd}>
        <div className='month-calendar-header'>
          <a className='back ss-icon' onClick={this.onPrevMonth}>previous</a>
          <a className='next ss-icon' onClick={this.onNextMonth}>next</a>
          <h5 className='month'>{this.monthString(displayMonth)}</h5>
          <p className='year'>{displayMonth.getFullYear()}</p>
          <hr />
        </div>
        <table className='month-calendar-dates'>
          <thead>
            <tr>
              <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </div>
    )
  }
}

MonthCalendar.propTypes = {
  name: PropTypes.string.isRequired,
  // we accept onMouseDown & onTouchEnd Handlers
  // for use in conjunction with an input field
  // to cancel events that would blur the field.
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired
}

MonthCalendar.defaultProps = {
  name: 'calendar',
  value: new Date()
}
