import React, { PropTypes } from 'react';

const QueryHistoryItem = ({ data, onSelect }) => {
  return (
    <div className="queryHistoryItem" onClick={onSelect}>
      <p>{data.statement}</p>
    </div>
  );
};

QueryHistoryItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

QueryHistoryItem.defaultProps = {
};

export default QueryHistoryItem;
