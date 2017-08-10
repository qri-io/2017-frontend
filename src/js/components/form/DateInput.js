import React, { PropTypes } from 'react';
import MonthCalendar from './MonthCalendar';

/*
 * @stateful
 * 
 * DateInput form field. 
 * It uses a child MonthCalendar component to handle display & selection
 * Uses state to track weather or not the field is focused.
 * 
 */

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ["Mon", "Tue","Wed", "Thu", "Fri", "Sat", "Sun"];

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  // methods
  blur = () => {
    this.setState({ focused : false });
  }
  focus = () => {
    this.setState({ focused : true });
  }
  stringValue = (date) => {
    if (!date) { return ""; }
    return months[date.getMonth()]  + " " + date.getDate() + " " + date.getFullYear();
  }

  // handlers
  onFocus = (e) => {
    this.setState({ focused : true });
  }
  onBlur = (e) => {
    this.setState({ focused : false });
  }
  onInputChange = (e) => {
    this.props.onChange(this.props.name, e.target.value, e);
  }
  onCalendarChange = (date, e) => {
    this.props.onChange(this.props.name, date, e);
    // Once the User has picked a value, close the calendar
    this.setState({ focused : false });
  }
  // Cancel Blur event triggered by clicking the calendar
  onCalendarMouseDown  = (e) => {
    e.preventDefault();
    // React.findDOMNode(this.refs["field"]).focus();
  }
  onCalendarTouchEnd = (e) => {
    e.stopPropagation();
  }

  // Render
  render() {
    let calendar
      , value = this.props.value
      , stringValue = this.stringValue(value);

    return (
      <div className={this.props.className}>
        <input 
          readOnly
          ref="field"
          type="text"
          className="form-control"
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
    );
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  // Use either onChange or onValueChange, not both
  // raw change handler
  onChange: PropTypes.func,
  // change handler in the form (value, name)
  onValueChange: PropTypes.func,
  // Should be a Date object. Defaults to today.
  value: PropTypes.object,
};

DateInput.defaultProps = {
  className: "dateInput",
  value: new Date(),
};

export default DateInput;
