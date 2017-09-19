import React, { PropTypes } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/pgsql'
import '../ace/theme/qri'

const CodeEditor = (props) => {
  return (<AceEditor mode='pgsql' theme='qri' {...props} />)
}

CodeEditor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editorProps: PropTypes.object
}

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
    wrapEnabled: false
    // enableBasicAutocompletion: false,
    // enableLiveAutocompletion: false,
  }
}

export default CodeEditor
