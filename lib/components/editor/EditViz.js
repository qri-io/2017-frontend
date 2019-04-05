import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
import Button from '../chrome/Button'

const blankViz = {
  format: 'html'
}

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
].join('\n')

export default class VizEditor extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'editorDidMount',
      'onAddViz',
      'onRemoveViz'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  editorDidMount (editor, monaco) {
    editor.focus()
  }

  onAddViz () {
    this.props.onChangeViz(blankViz)
    this.props.onChangeScript(starter)
  }

  onRemoveViz () {
    this.props.onRemove('viz')
    this.props.onChangeScript(undefined)
  }

  render () {
    const { script, onChangeScript, layout } = this.props
    const options = {
      selectOnLineNumbers: true
    }

    if (!script) {
      return (
        <div className='edit-viz-wrap'>
          <div className='edit-viz-center'>
            <Button onClick={this.onAddViz} color='b' text='Add Viz Script' />
          </div>
        </div>
      )
    }

    return (
      <div className='edit-viz-wrap'>
        <header className='edit-viz-header'>
          <Button onClick={this.onRemoveViz} color='b' text='Remove' />
        </header>
        <div className='edit-viz-content'>
          <MonacoEditor
            language='html'
            theme='vs-dark'
            value={script}
            options={options}
            onChange={onChangeScript}
            editorDidMount={this.editorDidMount}
            height={layout.height - 100}
          />
        </div>
      </div>
    )
  }
}

VizEditor.propTypes = {
  viz: PropTypes.object,
  onChangeViz: PropTypes.func.isRequired,
  script: PropTypes.string,
  onChangeScript: PropTypes.func.isRequired
}

VizEditor.defaultProps = {
  viz: {}
}
