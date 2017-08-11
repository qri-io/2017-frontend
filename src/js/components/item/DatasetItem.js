import React from 'react';
import { Link } from 'react-router';

const DatasetItem = ({ data, onSelect }) => {
  return (
    <div className="dataset item">
      <h3 onClick={onSelect}>
        <Link className="name" to={`/datasets${data.subject}`}>{data.title ? data.title : "unnamed dataset"}</Link>
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
  onSelect: React.PropTypes.func.isRequired,
};

DatasetItem.defaultProps = {
};

export default DatasetItem;
