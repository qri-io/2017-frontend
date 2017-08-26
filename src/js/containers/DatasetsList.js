import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import { loadDatasets } from '../actions/dataset';
import { selectAllDatasets } from '../selectors/dataset';

import List from '../components/List';
import DatasetItem from '../components/item/DatasetItem';
import Spinner from '../components/Spinner';

class DatasetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: props.datasets.length == 0 };
    [
      'onSelectDataset',
      'handleAddItem',
    ].forEach((m) => { this[m] = this[m].bind(this); });
  }

  componentWillMount() {
    this.props.loadDatasets(this.props.nextPage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.datasets.length > 0 && this.props.datasets.length == 0) {
      this.setState({ loading: false });
    }
  }

  onSelectDataset(index, datasetRef) {
    this.props.push(`/datasets${datasetRef.path}`);
  }

  handleLoadNextPage() {
    this.props.loadDatasets(this.props.nextPage);
  }

  handleAddItem() {
    this.props.push('/datasets/new');
  }

  render() {
    const { loading } = this.state;
    const { datasets } = this.props;

    if (loading) {
      return (
        <div className="container">
          <Spinner />
        </div>
      );
    }

    return (
      <div id="wrapper">
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Link to="/datasets/add"><button className="btn btn-primary right">Add</button></Link>
                <h1>Datasets</h1>
                <hr />
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <List data={datasets} component={DatasetItem} onSelectItem={this.onSelectDataset} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DatasetsList.propTypes = {
  datasets: PropTypes.array.isRequired,
  nextPage: PropTypes.number.isRequired,
  // fetchedAll: PropTypes.bool,
  push: PropTypes.func.isRequired,
  loadDatasets: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const pagination = state.pagination.popularDatasets;

  return Object.assign({
    datasets: selectAllDatasets(state),

    loading: (pagination.popularDatasets) ? pagination.popularDatasets.isFetching : false,
    nextPage: (pagination.popularDatasets) ? (pagination.popularDatasets.pageCount + 1) : 1,
    fetchedAll: (pagination.popularDatasets) ? pagination.popularDatasets.fetchedAll : false,

  }, ownProps);
}

export default connect(mapStateToProps, {
  push,
  loadDatasets,
})(DatasetsList);
