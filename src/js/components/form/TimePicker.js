import React, { Component, PropTypes } from 'react';
import Clock from './Clock';
/*
 * TimePicker Pairs the Clock Component with an
 * input field.
 *
 */

class TimePicker extends Component {
  static propTypes = {
    // @todo
  }
  static hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  static minutes = ["00", "15", "30", "45"]
  static phase = ["am", "pm"]
  state = {
    focused: false,
  }

  // return a string representation of the time
  _stringValue = () => {
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
      h = h - 12;
    }

    return this.hours[(h === 0) ? h : h - 1] + ":" + this.minutes[m] + " " + this.phase[ph]
  }
  _focus = () => {
    this.setState({ focused : true });
  }
  _blur = () => {
    this.setState({ focused : false });
  }
  _fakeFn = () => { }
  // Clicks on the clock div should maintain focus on the element
  _clockMouseDown = (e) => {
    e.preventDefault();
    // Cancel Blur event triggered by clicking the clock
    $(React.findDOMNode(this.refs["field"])).focus();
    return false;
  }
  _clockChange = (value) => {
    if (typeof this.props.onChange === "function") {
      this.props.onChange({
        name : this.props.name,
        value : value
      });
    }
  }

  // Render
  render() {
    var time
      , display = this._stringValue();

    // if (this.refs["field"]) {
    //  if ($(this.refs["field"]).is(":focus")) {
    if (this.state.focused) {
      time = <Clock onMouseDown={this._clockMouseDown} value={this.props.value} onChange={this._clockChange} /> 
    }

    return (
      <div className="timePicker field">
        <label>{this.props.label}</label>
        <input ref="field" value={display} onChange={this._fakeFn} onFocus={this._focus} onBlur={this._blur}></input>
        {time}
      </div>
    )
  }
}

export default TimePicker;