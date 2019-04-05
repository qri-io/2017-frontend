import React from 'react'
import PropTypes from 'prop-types'
import MonthCalendar from './MonthCalendar'

/*
 * DateInput form field.
 * Uses a child MonthCalendar component to handle display & selection
 * Uses state to track weather or not the field is focused.
 */

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default class DateInput extends React.PureComponent {
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
    const { value, className } = this.props

    let stringValue = this.stringValue(value)

    return (
      <div className={`${className} date-input`}>
        <input
          readOnly
          ref={(el) => { this.field = el }}
          type='text'
          className='form-control date-input-border'
          onClick={this.onFocus}
          onTouchEnd={this.onFocus}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={stringValue}
          onChange={this.onInputChange}
        />
        {this.state.focused &&
          <MonthCalendar
            value={value}
            className='date-input-calendar'
            onMouseDown={this.onCalendarMouseDown}
            onTouchEnd={this.onCalendarTouchEnd}
            onChange={this.onCalendarChange}
          />}
      </div>
    )
  }
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  // change handler in the form (value, name)
  onChange: PropTypes.func.isRequired,
  // Should be a Date object. Defaults to today.
  value: PropTypes.instanceOf(Date).isRequired
}

DateInput.defaultProps = {
  value: new Date()
}
