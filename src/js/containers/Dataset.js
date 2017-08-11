import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

import { downloadDataset } from '../actions/dataset';
import { setQuery, runQuery, downloadQuery } from '../actions/query';

import { selectDataset } from '../selectors/dataset';
import { selectSessionUser } from '../selectors/session';
// import { selectQueryById } from '../selectors/query';

import List from '../components/List';
import DatasetItem from '../components/item/DatasetItem';
import DatasetHeader from '../components/DatasetHeader';
import FieldsList from '../components/FieldsList';
import QueryEditor from '../components/QueryEditor';
import ResultsTable from '../components/ResultsTable';

class Dataset extends React.Component {
  constructor(props) {
    super(props);

    [
      'handleRunQuery',
      'handleEditorChange',
      'handleEditorAddressChange',
      'handleLoadMoreResults',
      'handleDownloadQuery',
      'handleDownloadDataset',
      'renderChildDatasets',
      'renderData',
    ].forEach((m) => { this[m] = this[m].bind(this); });

    // this.debouncedSetQuery = debounce(props.setQuery, 200)
  }

  componentWillMount() {
    // this.props.loadDatasetByAddress(this.props.address, ["fields"])
    // this.props.loadDatasetReadme(this.props.address)
    // this.props.loadDatasetChildren(this.props.address)

    // match the address to the current namespce, unless there's already a query
    if (this.props.dataset && this.props.dataset.default_query) {
      this.props.setQuery(this.props.dataset.default_query);
    } else {
      this.props.setQuery({
        // address : this.props.address,
        statement: `select * from ${this.props.address}`,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address != this.props.address) {
      this.props.loadDatasetByAddress(nextProps.address);
    }

    if (nextProps.dataset != this.props.dataset) {
      this.props.setQuery(nextProps.dataset.default_query || { statement: `select * from ${nextProps.address}` });
    }
  }

  handleEditorAddressChange(value) {
    this.props.setQueryAddress(value);
  }

  handleEditorChange(value) {
    // this.debouncedSetQuery(value)
    this.props.setQuery(value);
  }

  handleDownloadDataset(e) {
    e.preventDefault();
    this.props.downloadDataset(this.props.address);
  }

  handleRunQuery(e) {
    e.preventDefault();
    this.props.runQuery({
      query: this.props.query,
      page: 1,
    });
  }

  handleDownloadQuery() {
    this.props.runQuery({
      query: this.props.query,
      download: true,
    });
  }

  handleLoadMoreResults() {
    this.props.runQuery({
      query: this.props.query,
      page: (this.props.results.pageCount + 1),
    });
  }

  renderEditButtons(props) {
    const { path, permissions } = props;

    if (permissions.migrate && permissions.change) {
      return (
        <div>
          <Link to={`${path}/edit`}><button type="button" className="btn btn-primary" style={{ marginRight: 5 }}>Edit</button></Link>
          <Link to={`${path}/migrations/new`}><button type="button" className="btn btn-primary" style={{ marginRight: 5 }}>New Migration</button></Link>
          <Link to={`${path}/changes/new`}><button type="button" className="btn btn-primary" style={{ marginRight: 5 }}>New Change</button></Link>
        </div>
      );
    }

    return undefined;
  }

  renderResults(props) {
    const { results } = props;
    if (!results) { return undefined; }
    return (
      <div className="col-md-12">
        <hr className="green" />
        <h4 className="green">Results</h4>
        <ResultsTable results={results} onLoadMore={this.handleLoadMoreResults} />
      </div>
    );
  }

  renderReadme(readme) {
    if (!readme) return undefined;
    return (
      <div className="row">
        <section className="col-md-12">
          <ReactMarkdown escapeHtml source={readme.text} />
        </section>
      </div>
    );
  }

  renderQueryAndResults() {
    const { query } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <QueryEditor query={query} onRun={this.handleRunQuery} onDownload={this.handleDownloadQuery} onChange={this.handleEditorChange} />
        </div>
        {this.renderResults(this.props)}
      </div>
    );
  }

  renderData() {
    const { data } = this.props;
    if (!data) { return undefined; }
    return (
      <div className="col-md-12">
        <hr className="green" />
        <h4 className="green">Results</h4>
        <ResultsTable results={data} onLoadMore={this.handleLoadMoreResults} />
      </div>
    );
  }

  renderDescription() {
    const { dataset } = this.props;
    if (!dataset.description) { return undefined; }
    return (
      <div className="row">
        <section className="col-md-12">
          <hr className="blue" />
          <p>{ dataset.description }</p>
        </section>
      </div>
    );
  }

  renderChildDatasets() {
    return (
      <div className="row">
        <section className="col-md-12">
          <hr className="blue" />
          <h4>Children:</h4>
        </section>
        <List component={DatasetItem} data={this.props.descendants} />
      </div>
    );
  }

  render() {
    const { dataset, readme } = this.props;
    // const path = "/" + address.replace(".", "/", -1)
    // const hasData = (dataset && (dataset.url || dataset.file || dataset.data));
    const hasData = true;

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
          <DatasetHeader dataset={dataset} onDownload={this.handleDownloadDataset} />
          <div className="row">
            <div className="col-md-12">
              {(dataset.schema && dataset.schema.fields) ? <FieldsList fields={dataset.schema.fields} /> : <p>This dataset currently has no specified fields</p> }
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {this.renderEditButtons(this.props)}
            </div>
          </div>
          {hasData ? this.renderData() : undefined }
          {readme ? this.renderReadme(readme) : this.renderDescription() }
        </div>
      </div>
    );
  }
}

Dataset.propTypes = {
  // username.dataset address for this dataset, should
  // be derived from url params
  // path: PropTypes.string.isRequired,

  // the dataset model to display
  dataset: PropTypes.object,
  // Readme model if available
  readme: PropTypes.object,
  // default query to show if none is present
  default_query: PropTypes.object,

  // query for console
  query: PropTypes.object.isRequired,
  // results (if any)
  results: React.PropTypes.object,

  // permissions stuff, will show things based on capabilities
  // permissions: PropTypes.object.isRequired,

  // action to load a dataset from passed-in address
  // loadDatasetByAddress : PropTypes.func.isRequired,

  setQuery: PropTypes.func.isRequired,
  runQuery: PropTypes.func.isRequired,
  downloadDataset: PropTypes.func.isRequired,
  // loadDatasetReadme : PropTypes.func.isRequired
};

Dataset.defaultProps = {
  permissions: {
    edit: false,
    migrate: false,
    change: false,
  },
};

function mapStateToProps(state, ownProps) {
  // let address = ownProps.params.splat.replace(/\//gi,".")
  const path = `/${ownProps.params.splat}`;

  const user = selectSessionUser(state);
  const results = state.results[state.console.query.statement];

  let permissions = {
    edit: false,
    migrate: false,
    change: false,
  };

  if (user && user.username == ownProps.params.user) {
    permissions.migrate = true;
    permissions.change = true;
  }

  return Object.assign({
    path,

    dataset: selectDataset(state, path),
    // readme : selectDatasetReadme(state, address),
    // descendants : selectDatasetDescendants(state, address),

    results,
    permissions,

  }, state.console, ownProps);
}

export default connect(mapStateToProps, {
  setQuery,
  runQuery,
  downloadQuery,
  downloadDataset,
  // loadDatasetReadme,
  // loadDatasetChildren,

  // loadDatasetByAddress
})(Dataset);
