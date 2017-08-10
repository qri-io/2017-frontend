import React from 'react';
import { Link } from 'react-router';

import ValidInput from './form/ValidInput'
;
import ValidSelect from './ValidSelect';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      task: {
        title: "Add to IPFS",
        taskType: "ipfs.add",
        params: {
          url: "https://i.redd.it/59su4dfwq08z.jpg",
        },
      },
      validation : {},
      showErrors : false,
    };

    [
      "handleChange",
      "handleSubmit",
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  handleChange(name, value) {
    let params = Object.assign({}, this.state.task.params, { [name] : value });
    let task = Object.assign({}, this.state.task, { params });
    const change = Object.assign({}, this.state, { task });
    this.setState(change);
  }

  handleSubmit() {
    console.log(this.state.task);
    this.props.onSubmit(this.state.task);
  }

  render() {
    const { task, validation, showErrors } = this.state;

    return (
      <div className="task form col-md-3">
        <h3>Archive Url</h3>
        <ValidInput type="text" label="Url" name="url" value={task.params.url} error={validation.username} showError={showErrors} onChange={this.handleChange} />
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit Task</button>
      </div>
    );
  }
};

TaskForm.propTypes = {
  // data: React.PropTypes.object.isRequired,
  // onSelect: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

TaskForm.defaultProps = {
};