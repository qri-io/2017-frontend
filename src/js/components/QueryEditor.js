import React, { PropTypes } from 'react';
import CodeEditor from './CodeEditor';

import { datasetCompleter } from '../ace/completer/datasets';
import ValidTextarea from './form/ValidTextarea';

const QueryEditor = ({ name, query, onDownload, onRun, onChange }) => {
  const handleChange = (name, value) => {
    onChange({ queryString: value });
  };

  return (
    <div className="queryEditor">
      <CodeEditor
        name={name}
        value={query.queryString}
        onChange={value => onChange({ queryString: value, address: query.address })}
        completers={[datasetCompleter]}
        width='940px'
        height='200px'
        setOptions={{
          // TODO - reenable when adding back completion
          // enableBasicAutocompletion: true,
          // enableLiveAutocompletion: true,
        }}
      />
      {/* <ValidTextarea name="editor" value={query.queryString} onChange={handleChange} /> */ }
      <button className="btn btn-primary" style={{ marginRight: 10 }} onClick={onDownload}>Download</button>
      <button className="btn btn-primary" onClick={onRun}>Run</button>
    </div>
  );
};

QueryEditor.propTypes = {
  name: PropTypes.string.isRequired,
  query: PropTypes.object,
  // datasets: PropTypes.array,

  onRun: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

QueryEditor.defaultProps = {
  query: {
    queryString: "",
  },
};

export default QueryEditor;
