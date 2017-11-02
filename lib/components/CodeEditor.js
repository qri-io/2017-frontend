import React, { PropTypes } from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/pgsql'
import '../ace/theme/qri'
import Base from './Base'

export default class CodeEditor extends Base {
  template (css) {
    return (<AceEditor mode='pgsql' theme='qri'
      {...Object.assign({}, this.props.editorProps, this.props)}
      />)
  }
}

CodeEditor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  completers: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.string,
  height: PropTypes.string,
  editorProps: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

CodeEditor.defaultProps = {
  editorProps: {
    $blockScrolling: true,
    fontSize: 16,
    showGutter: true,
    onChange: null,
    onPaste: null,
    onLoad: null,
    onScroll: null,
    minLines: null,
    maxLines: null,
    readOnly: false,
    showPrintMargin: true,
    tabSize: 2,
    cursorStart: 1,
    wrapEnabled: false,
    highlightActiveLine: false
    // enableBasicAutocompletion: false,
    // enableLiveAutocompletion: false,
  }
}
