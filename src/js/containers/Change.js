import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadChangeByNumber, executeChange, declineChange } from '../actions/change';
import { selectChangeByNumber } from '../selectors/change';

import Spinner from '../components/Spinner';

class Change extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: !props.change };
    ["handleExecute", "handleDecline"].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadChangeByNumber(this.props.address, this.props.number);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address != this.props.address || nextProps.number != this.props.number) {
      this.props.loadChangeByNumber(nextProps.address, nextProps.number);
      this.setState({ loading: true });
    } else if (nextProps.change && this.state.loading) {
      this.setState({ loading: false });
    }
  }

  handleExecute() {
    if (confirm("are you sure you want to execute this change?")) {
      this.props.executeChange(this.props.change);
    }
  }

  handleDecline() {
    if (confirm("are you sure you want to decline this change")) {
      this.props.declineChange(this.props.change);
    }
  }

  render() {
    const { loading } = this.state;
    const { change } = this.props;

    if (loading) {
      return (
        <div className="spinner">
          <Spinner />
        </div>
      );
    }

    if (!change) {
      return (
        <div className="notFound">
          <h1>Not Found</h1>
        </div>
      );
    }

    return (
      <div className="change container">
        <p>Change</p>
        <h3>{change.number || change.id}</h3>
        <hr />
        <h4>{change.sql}</h4>
        <p>{change.description}</p>
        <button className="btn btn-large btn-warning" onClick={this.handleDecline}>Decline</button>
        <button className="btn btn-large btn-success" onClick={this.handleExecute}>Execute</button>
      </div>
    );
  }
}

Change.propTypes = {
  address: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,

  change: PropTypes.object,

  loadChangeByNumber: PropTypes.func.isRequired,
  executeChange: PropTypes.func.isRequired,
  declineChange: PropTypes.func.isRequired,
};

Change.defaultProps = {
};

function mapStateToProps(state, ownProps) {
  const { number, user, dataset } = ownProps.params;
  const address = [user, dataset].join(".");
  return Object.assign({
    address,
    number,
    change: selectChangeByNumber(state, address, number),
  }, ownProps);
}

export default connect(mapStateToProps, {
  loadChangeByNumber,
  executeChange,
  declineChange,
})(Change);
