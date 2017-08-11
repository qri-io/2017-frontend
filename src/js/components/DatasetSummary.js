import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DatasetSummary = ({ dataset }) => {
  return (
    <div className="dataset detail">
      <hr className="red" />
      <Link>
        <h3>{dataset.name}</h3>
        <p>{dataset.address}</p>
      </Link>
      <p>{dataset.description}</p>
    </div>
  );
};

DatasetSummary.propTypes = {
  dataset: PropTypes.object,
};

DatasetSummary.defaultProps = {
};

export default DatasetSummary;
