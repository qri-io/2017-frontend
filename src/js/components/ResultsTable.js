import React, { PropTypes } from 'react';
import Spinner from './Spinner';

const ResultsTable = ({ results, onLoadMore }) => {
  if (!results) {
    return <div className="resultsTable"></div>;
  }

  const { fields, data, fetching, fetchedAll, error } = results;
  // const displaySchema = fields.reduce(removeStdCols(fields, showStdCols),[])

  if (error) {
    return (
      <div className="resultsTable">
        <h5>{error}</h5>
      </div>
    );
  }

  return (
    <div className="resultsTable">
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

ResultsTable.propTypes = {
  results: PropTypes.object,

  // showLoadMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func,
};

ResultsTable.defaultProps = {
  showStdCols: false,
  showLoadMore: false,
};

export default ResultsTable;
