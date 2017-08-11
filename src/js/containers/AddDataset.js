import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { selectSessionUser } from '../selectors/session';
// import { selectDataset } from '../selectors/dataset';

import DropFile from '../components/form/DropFile';
import ValidInput from '../components/form/ValidInput';
// import List from '../components/List';
// import DatasetItem from '../components/item/DatasetItem';

class AddDataset extends React.Component {
  constructor(props) {
    super(props);

    [
      'handleAddFile',
      'handleChange',
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  handleChange() {

  }

  handleAddFile() {

  }

  render() {
    return (
      <div id="wrapper" className="page">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h1>Add a Dataset</h1>
              <hr />
              <ValidInput type="text" name="varname" label="varname" value="varname" onChange={this.handleChange} />
              <DropFile />
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddDataset.propTypes = {
  addDataset: PropTypes.func,
};

AddDataset.defaultProps = {
  permissions: {
    edit: false,
    migrate: false,
    change: false,
  },
};

function mapStateToProps(state, ownProps) {
  return Object.assign({
    user: selectSessionUser(state),
  }, state.console, ownProps);
}

export default connect(mapStateToProps, {})(AddDataset);
