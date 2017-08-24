import React from 'react';
import CodeEditor from './CodeEditor';

import { datasetCompleter } from '../ace/completer/datasets';
import ValidTextarea from './form/ValidTextarea';

const QueryEditor = ({ query, onDownload, onRun, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ queryString: value });
  };

  return (
    <div className="queryEditor">
      {/* <CodeEditor
        value={query.queryString}
        onChange={value => onChange({ queryString: value, address: query.address })}
        mode="pgsql"
        completers={[datasetCompleter]}
        setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion: true }}
      /> */}
      <ValidTextarea name="editor" value={query.queryString} onChange={handleChange} />
      <button className="btn btn-primary" style={{ marginRight: 10 }} onClick={onDownload}>Download</button>
      <button className="btn btn-primary" onClick={onRun}>Run</button>
    </div>
  );
};

QueryEditor.propTypes = {
  query: React.PropTypes.object,
  // datasets: React.PropTypes.array,

  onRun: React.PropTypes.func.isRequired,
  onDownload: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

QueryEditor.defaultProps = {
  query: {
    queryString: "",
  },
};

export default QueryEditor;
