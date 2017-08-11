import React, { Component, PropTypes } from 'react';

/*
 * Clock is used for selecting time values in 15-minute
 * increments. Often used in conjunction with TimePicker.
 *
 * @todo - one day should support arbitrary minute increments
 *
 */
// const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
// const minutes = ["00","15","30","45"];

class Clock extends Component {
  static propTypes = {
    name: PropTypes.string,
    onValueChange: PropTypes.func,
    // disabled: PropTypes.bool,
    // must be a valid date object
    value: PropTypes.object.isRequired,
  }

  // handlers
  onChange = (value) => {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(value);
    } else if (typeof this.props.onValueChange === "function") {
      this.props.onValueChange(value, this.props.name);
    }
  }


  // Factory Funcs
  // return a up-incrementer
  up = (unit) => {
    return (e) => {
      let t = new Date(this.props.value);
      e.preventDefault();
      switch (unit) {
        case "hours":
          t.setHours((t.getHours() === 23) ? 0 : t.getHours() + 1);
          break;
        case "minutes":
          t.setMinutes((t.getMinutes() === 45) ? 0 : t.getMinutes() + 15);
          break;
        case "phase":
          t.setHours((t.getHours() < 12) ? t.getHours() + 12 : t.getHours() - 12);
          break;
        default:
          break;
      }
      t.setYear(this.props.value.getFullYear());
      t.setMonth(this.props.value.getMonth());
      t.setDate(this.props.value.getDate());
      this.onChange.call(this, t);
    };
  }
  // return an down-incrementer
  down = (unit) => {
    return (e) => {
      let t = new Date(this.props.value);
      e.preventDefault();
      switch (unit) {
        case "hours":
          t.setHours((t.getHours() === 0) ? 23 : t.getHours() - 1);
          break;
        case "minutes":
          t.setMinutes((t.getMinutes() === 0) ? 45 : t.getMinutes() - 15);
          break;
        case "phase":
          t.setHours((t.getHours() < 12) ? t.getHours() - 12 : t.getHours() + 12);
          break;
        default:
          break;
      }
      t.setYear(this.props.value.getFullYear());
      t.setMonth(this.props.value.getMonth());
      t.setDate(this.props.value.getDate());
      this.onChange.call(this, t);
    };
  }
  // render
  render() {
    const value = this.props.value;

    return (
      <div className="clock" onMouseDown={this.props.onMouseDown}>
        <div className="hours segment">
          <a onClick={this.up("hours")} onTouchEnd={this.up("hours")} className="ss-icon">ascend</a>
          <h5>{() => {
            let hours = value.getHours();
            hours = (hours < 12) ? hours : hours - 12;
            if (!hours) {
              hours = "12";
            } else if (hours < 10) {
              hours = `0${hours}`;
            }
            return hours;
          }}</h5>
          <a onClick={this.down("hours")} onTouchEnd={this.down("hours")} className="ss-icon">descend</a>
        </div>
        <h5 className="separator segment">:</h5>
        <div className="minutes segment">
          <a onClick={this.up("minutes")} onTouchEnd={this.up("minutes")} className="ss-icon">ascend</a>
          <h5>{value.getMinutes() || "00"}</h5>
          <a onClick={this.down("minutes")} onTouchEnd={this.down("minutes")} className="ss-icon">descend</a>
        </div>
        <div className="phase segment">
          <a onClick={this.up("phase")} onTouchEnd={this.up("phase")} className="ss-icon">ascend</a>
          <h5>{(value.getHours() < 12) ? "am" : "pm"}</h5>
          <a onClick={this.down("phase")} onTouchEnd={this.down("phase")} className="ss-icon">descend</a>
        </div>
      </div>
    );
  }
}

export default Clock;
