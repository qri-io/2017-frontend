import React, { PropTypes } from 'react';

const DatasetItem = ({ index, data, onSelect }) => {
  const { dataset } = data;

  const handleSelect = () => {
    onSelect(index, data);
  }

  return (
    <div className="dataset item">
      <h3 onClick={handleSelect}>
        {data.name || "unnamed dataset"}
      </h3>
      <p className="address">{data.path}</p>
      {/* <ul>
        {data.schema.fields && data.schema.fields.map((table, i) => <li key={i}>{table.name}</li>)}
      </ul> */}
    </div>
  );
};

DatasetItem.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

DatasetItem.defaultProps = {
};

export default DatasetItem;
