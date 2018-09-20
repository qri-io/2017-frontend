import React from 'react'
import MonacoEditor from 'react-monaco-editor'

import Base from '../Base'

const starter = [
  '',
  'def transform(ds):',
  '  print("hello Qri! \\n")',
  '  ds.set_body(["this","is","dataset","data"])',
  '  return ds'
]

export default class TransformEditor extends Base {
  constructor (props) {
    super(props)
    this.state = {
      code: starter.join('\n')
    };

    [
      'editorDidMount',
      'onChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  editorDidMount (editor, monaco) {
    editor.focus()
  }
  onChange (code, e) {
    this.setState({ code })
  }

  template (css) {
    const { code } = this.state
    const options = {
      selectOnLineNumbers: true
    }
    return (
      <MonacoEditor
        language='python'
        theme='vs-dark'
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    )
  }

  styles () {
    return {
    }
  }
}

TransformEditor.propTypes = {

}

TransformEditor.defaultProps = {

}
