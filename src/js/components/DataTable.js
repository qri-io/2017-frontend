import React, { PropTypes } from 'react';
import Spinner from './Spinner';

const DataTable = ({ data, fields, fetching, fetchedAll, error, onLoadMore }) => {
  if (!data) {
    return <div className="resultsTable"></div>;
  }

  if (error) {
    return (
      <div className="dataTable resultsTable">
        <h5>{error}</h5>
      </div>
    );
  }

  return (
    <div className="dataTable resultsTable">
      <div className="table-responsive">
        <table className="table table-hover query-results">
          <thead><tr>{fields.map((col, i) => <th className="blue" key={i}>{col.name}</th>)}</tr></thead>
          <tbody>
            {data.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((cell, j) => {
                    return <td className={`dt-${fields[j].type}`} key={`${i}.${j}`}>{cell.toString()}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      { fetching ? <Spinner /> : undefined }
      { (!fetching && !fetchedAll) ? <button className="btn btn-primary btn-large" onClick={onLoadMore}>Load More</button> : undefined }
    </div>
  );
};

DataTable.propTypes = {
  fields: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
  fetchedAll: PropTypes.bool,
  showLoadMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  error : PropTypes.string,
};

DataTable.defaultProps = {
  showLoadMore: false,
};

export default DataTable;
