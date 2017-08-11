import React, { Component, PropTypes } from 'react';
import Clock from './Clock';
/*
 * TimePicker Pairs the Clock Component with an
 * input field.
 *
 */

// const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
// const minutes = ["00", "15", "30", "45"];
// const phase = ["am", "pm"];

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };

    [
      "stringValue",
      "onFocus",
      "onBlur",
      "onClockChange",
      "onClockMouseDown",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }
  state = {
    focused: false,
  }

  onFocus() {
    this.setState({ focused: true });
  }
  onBlur() {
    this.setState({ focused: false });
  }
  // Clicks on the clock div should maintain focus on the element
  onClockMouseDown(e) {
    e.preventDefault();
    // Cancel Blur event triggered by clicking the clock
    this.field.focus();
    return false;
  }
  onClockChange(value) {
    if (typeof this.props.onChange === "function") {
      this.props.onChange({
        name: this.props.name,
        value,
      });
    }
  }

    // return a string representation of the time
  stringValue() {
    let val = this.props.value;
    // if no initial value return blank string
    if (!val) {
      return "";
    }

    if (typeof val === "number") {
      val = new Date(val);
    }

    let h = val.getHours(),
      ph = (h <= 12) ? 0 : 1,
      m = (15 * Math.round(val.getMinutes() / 15)) / 15;

    // if we're in the aft, minus 12 to de-militarize time
    if (ph === 1) {
      h -= 12;
    }

    return `${this.hours[(h === 0) ? h : h - 1]}:${this.minutes[m]} ${this.phase[ph]}`;
  }

  // Render
  render() {
    let time, display = this.stringValue();

    // if (this.refs["field"]) {
    //  if ($(this.refs["field"]).is(":focus")) {
    if (this.state.focused) {
      time = <Clock onMouseDown={this.onClockMouseDown} value={this.props.value} onChange={this.onClockChange} />;
    }

    return (
      <div className="timePicker field">
        <label>{this.props.label}</label>
        <input
          ref={(el) => { this.field = el; }}
          value={display}
          onChange={() => {}}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        ></input>
        {time}
      </div>
    );
  }
}

TimePicker.PropTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.date.isRequired,
};

export default TimePicker;
