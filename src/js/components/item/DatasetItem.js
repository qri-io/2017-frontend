import React from 'react';
import { Link } from 'react-router';

const DatasetItem = ({ data, onSelect }) => {
  const { dataset } = data;
  return (
    <div className="dataset item">
      <h3>
        <Link className="name" onClick={onSelect} to={data.path ? `/datasets${data.path}` : undefined}>{data.name || "unnamed dataset"}</Link>
      </h3>
      <p className="address">{data.path}</p>
      {/* <ul>
        {data.schema.fields && data.schema.fields.map((table, i) => <li key={i}>{table.name}</li>)}
      </ul> */}
    </div>
  );
};

DatasetItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func,
};

DatasetItem.defaultProps = {
};

export default DatasetItem;
