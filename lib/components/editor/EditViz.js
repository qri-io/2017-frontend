import React from 'react'
import MonacoEditor from 'react-monaco-editor'

import Base from '../Base'

const starter = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  '  <meta charset="utf-8" />',
  '  <meta http-equiv="X-UA-Compatible" content="IE=edge">',
  '  <title>My Viz Template</title>',
  '  <meta name="viewport" content="width=device-width, initial-scale=1">',
  '  <style>',
  '    body { margin: 0; padding: 0; font-family: helvetica, sans-serif; }',
  '  </style>',
  '</head>',
  '<body>',
  '  <div style="width: 100%; margin: 50px auto">',
  '    <h1>{{ .Meta.Title }}</h1>',
  '    <p>{{ .Meta.Description }}</p>',
  '    <small>Data Format: <b>{{ .Structure.Format }}</b></small>',
  '  </div>',
  '</body>',
  '</html>'
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
        language='html'
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
