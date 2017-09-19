import React, { PropTypes } from 'react'
import MonthCalendar from './MonthCalendar'

/*
 * DateInput form field.
 * Uses a child MonthCalendar component to handle display & selection
 * Uses state to track weather or not the field is focused.
 */

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

class DateInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      focused: false
    };

    [
      'blur',
      'focus',
      'stringValue',
      'onFocus',
      'onBlur',
      'onInputChange',
      'onCalendarChange',
      'onCalendarMouseDown',
      'onCalendarTouchEnd'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  // handlers
  onFocus () {
    this.setState({ focused: true })
  }
  onBlur () {
    this.setState({ focused: false })
  }
  onInputChange (e) {
    this.props.onChange(this.props.name, e.target.value, e)
  }
  onCalendarChange (date, e) {
    this.props.onChange(this.props.name, date, e)
    // Once the User has picked a value, close the calendar
    this.setState({ focused: false })
  }
  // Cancel Blur event triggered by clicking the calendar
  onCalendarMouseDown (e) {
    e.preventDefault()
    // React.findDOMNode(this.refs["field"]).focus();
  }
  onCalendarTouchEnd (e) {
    e.stopPropagation()
  }

  // methods
  blur () {
    this.setState({ focused: false })
  }
  focus () {
    this.setState({ focused: true })
  }
  stringValue (date) {
    if (!date) { return '' }
    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
  }

  // Render
  render () {
    const { value } = this.props

    let stringValue = this.stringValue(value)

    return (
      <div className={this.props.className}>
        <input
          readOnly
          ref={(el) => { this.field = el }}
          type='text'
          className='form-control'
          onClick={this.onFocus}
          onTouchEnd={this.onFocus}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={stringValue}
          onChange={this.onInputChange}
        />
        {this.state.focused &&
          <MonthCalendar
            value={this.props.value}
            onMouseDown={this.onCalendarMouseDown}
            onTouchEnd={this.onCalendarTouchEnd}
            onChange={this.onCalendarChange}
          />}
      </div>
    )
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  // change handler in the form (value, name)
  onChange: PropTypes.func,
  // Should be a Date object. Defaults to today.
  value: PropTypes.object
}

DateInput.defaultProps = {
  className: 'dateInput',
  value: new Date()
}

export default DateInput
