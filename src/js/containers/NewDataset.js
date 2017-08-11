import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { newDataset, updateDataset, saveDataset } from '../actions/dataset';
import { selectLocalDatasetById } from '../selectors/dataset';
import { selectSessionUser } from '../selectors/session';
import validateDataset from '../validators/dataset';

import ValidInput from '../components/form/ValidInput';
import ValidTextarea from '../components/form/ValidTextarea';
import SessionRequired from '../components/SessionRequired';

class NewDataset extends React.Component {
  constructor(props) {
    super(props);
    [
      "handleChange",
      "handleSubmit",
    ].forEach((m) => { this[m] = this[m].bind(this); });
    this.state = { showErrors: false };
  }

  componentWillMount() {
    this.props.newDataset({
      // if we have a session user, let's set it to be the owner
      owner: this.props.user,
      address: this.props.user.handle,
    });
  }

  handleChange(name, value, e) {
    e.preventDefault();
    const attrs = Object.assign({}, this.props.dataset);
    attrs[name] = value;
    this.props.updateDataset(attrs);
  }

  handleSubmit(e) {
    const { dataset, validation } = this.props;

    e.preventDefault();

    if (!validation.isValid) {
      if (!this.state.showErrors) {
        this.setState({ showErrors: true });
      }
    } else {
      this.props.saveDataset(dataset);
    }
  }

  render() {
    const { user, dataset, validation } = this.props;
    const { showErrors } = this.state;

    if (!user) {
      return <SessionRequired />;
    }

    if (!dataset) {
      return (
        <div className="dataset container">
          <p>No Dataset</p>
        </div>
      );
    }

    return (
      <div id="wrapper">
        <div className="container">
          <div className="col-md-8 col-md-offset-2">
            <form className="newDataset">
              <h3>{user.username}/{dataset.name}</h3>
              <ValidInput label="Name" name="name" value={dataset.name} showError={showErrors} error={validation.name} onChange={this.handleChange} />
              <ValidInput label="External Url" name="source_url" value={dataset.source_url} showError={showErrors} error={validation.source_url} onChange={this.handleChange} />
              <ValidInput label="Summary" name="summary" value={dataset.summary} showError={showErrors} error={validation.summary} onChange={this.handleChange} />
              <ValidTextarea label="Description" name="description" value={dataset.description} showError={showErrors} error={validation.description} onChange={this.handleChange} />
              <button className="btn btn-large btn-primary submit" disabled={(!validation.isValid && showErrors)} onClick={this.handleSubmit}>Create Dataset</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewDataset.propTypes = {
  // session user, required to set dataset owner
  user: PropTypes.object,
  // the dataset to manipulate
  dataset: PropTypes.object,
  // validation information for the dataset model
  validation: PropTypes.object,

  // action to create a new dataset, called on mount
  newDataset: PropTypes.func.isRequired,
  // local updates for storage in state
  updateDataset: PropTypes.func.isRequired,
  // action to send dataset data to server
  saveDataset: PropTypes.func.isRequired,
};

NewDataset.defaultProps = {
  // no default props
};

function mapStateToProps(state, ownProps) {
  const dataset = selectLocalDatasetById(state, "new");
  return Object.assign({}, {
    dataset,
    user: selectSessionUser(state),
    validation: validateDataset(dataset),
  }, ownProps.params, ownProps);
}

export default connect(mapStateToProps, {
  newDataset,
  updateDataset,
  saveDataset,
})(NewDataset);
