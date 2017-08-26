import React, { PropTypes } from 'react';
import { isEqual, debounce } from 'lodash';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/pgsql';
import '../ace/theme/qri';

export default class CodeEditor extends React.Component {
  render() {
    const { name, value, onChange, editorProps } = this.props;

    return (<AceEditor
      mode="pgsql"
      theme="qri"
      {...this.props}
    />); 
  }
}

CodeEditor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editorProps: PropTypes.object,
};

CodeEditor.defaultProps = {
  editorProps: { 
    $blockScrolling: true,
    fontSize: 14,
    showGutter: true,
    onChange: null,
    onPaste: null,
    onLoad: null,
    onScroll: null,
    minLines: null,
    maxLines: null,
    readOnly: false,
    highlightActiveLine: true,
    showPrintMargin: true,
    tabSize: 2,
    cursorStart: 1,
    wrapEnabled: false,
    // enableBasicAutocompletion: false,
    // enableLiveAutocompletion: false,
  },
};