import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

import Base from '../Base'
import Button from '../chrome/Button'

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

export default class TransformEditor extends Base {
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
    const { viz } = this.props
    this.props.onChange(Object.assign({}, viz, { format: 'html', script: starter }))
  }

  onRemoveViz () {
    const { viz } = this.props
    this.props.onChange(Object.assign({}, viz, { script: undefined }))
  }

  template (css) {
    const { script, onChangeScript } = this.props
    const options = {
      selectOnLineNumbers: true
    }

    if (!script) {
      return (
        <div className={css('wrap')}>
          <div className={css('center')}>
            <Button onClick={this.onAddViz} color='b' text='Add Viz Script' />
          </div>
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          <Button onClick={this.onRemoveViz} color='b' text='remove' />
        </header>
        <MonacoEditor
          language='html'
          theme='vs-dark'
          value={script}
          options={options}
          onChange={onChangeScript}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      },
      center: {
        width: 200,
        margin: '150px auto'
      },
      header: {
        padding: 4
      }
    }
  }
}

TransformEditor.propTypes = {
  viz: PropTypes.object,
  onChangeViz: PropTypes.func.isRequired,
  script: PropTypes.string,
  onChangeScript: PropTypes.func.isRequired
}

TransformEditor.defaultProps = {
  viz: {}
}
