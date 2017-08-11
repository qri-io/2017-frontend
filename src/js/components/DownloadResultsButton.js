/* globals __BUILD__ */
import React from 'react';

function downloadHref(id, query, format) {
  id = encodeURIComponent(id);
  query = encodeURIComponent(query);

  if (!id) {
    return `javascript:window.location='${__BUILD__.API_URL}/query?format=${format}&download=true&query=${query}'`;
  }
  return `javascript:window.location='/query?format=${format}&download=true&dataset-id=${id}&query=${query}'`;
}


const DownloadResultsButton = ({ query }) => {
  // <button class="btn btn-default" data-id="{{>id }}" data-page-num="{{>(page - 1) }}" data-query="{{>query}}" data-page-size="{{>pageSize}}" onclick="runButtonQuery(this)">Prev Page</button>
  // <button class="btn btn-default" data-id="{{>id }}" data-page-num="{{>(page + 1) }}" data-query="{{>query}}" data-page-size="{{>pageSize}}" onclick="runButtonQuery(this)">Next Page</button>
  return (
    <div className="downloadResultsButton">
      <a href={downloadHref('', query, "csv")}><button className="btn btn-default">.csv</button></a>
      <a href={downloadHref('', query, "json")}><button className="btn btn-default">.json</button></a>
    </div>
  );
};

DownloadResultsButton.propTypes = {
  // datasetId: React.PropTypes.string,
  query: React.PropTypes.string.isRequired,
};

DownloadResultsButton.defaultProps = {
};

export default DownloadResultsButton;
