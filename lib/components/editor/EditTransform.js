import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

import Base from '../Base'
import Button from '../Button'

const starter = [
  '',
  'def transform(ds):',
  '  print("hello Qri! \\n")',
  '  ds.set_body(["this","is","dataset","data"])',
  '  return ds'
].join('\n')

export default class TransformEditor extends Base {
  constructor (props) {
    super(props);

    [
      'editorDidMount',
      'onChange',
      'onAddTransform',
      'onRemoveTransform'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  editorDidMount (editor, monaco) {
    editor.focus()
  }

  onChange (script, e) {
    const { transform } = this.props
    this.props.onChange(Object.assign({}, transform, { script }))
  }

  onAddTransform () {
    const { transform } = this.props
    this.props.onChange(Object.assign({}, transform, { syntax: 'skylark', script: starter }))
  }

  onRemoveTransform () {
    this.props.onChange({})
  }

  template (css) {
    const { transform } = this.props

    const options = {
      selectOnLineNumbers: true
    }

    if (!transform.script) {
      return (
        <div className={css('wrap')}>
          <div className={css('center')}>
            <Button onClick={this.onAddTransform} color='b' text='Add Transform Script' />
          </div>
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          <Button onClick={this.onRemoveTransform} color='b' text='Remove' />
        </header>
        <MonacoEditor
          language='python'
          theme='vs-dark'
          value={transform.script}
          options={options}
          onChange={this.onChange}
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
  transform: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

TransformEditor.defaultProps = {
  transform: {}
}
