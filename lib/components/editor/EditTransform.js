import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

import Base from '../Base'
import Button from '../Button'
import KeyValueInput from '../form/KeyValueInput'

const starter = [
  '',
  'def transform(ds):',
  '  print("hello Qri! \\n")',
  '  ds.set_body(["this","is","dataset","data"])',
  '  return ds'
].join('\n')

export default class TransformEditor extends Base {
  constructor (props) {
    super(props)

    this.state = {
      panel: 'edit'
    };

    [
      'editorDidMount',
      'onEditorChange',
      'onConfigChange',
      'onSecretsChange',
      'onAddTransform',
      'onRemoveTransform',
      'panelSetter',
      'panelActive'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  editorDidMount (editor, monaco) {
    editor.focus()
  }

  onEditorChange (script, e) {
    const { transform } = this.props
    this.props.onChange(Object.assign({}, transform, { script }))
  }

  onConfigChange (_, config) {
    const { transform } = this.props
    this.props.onChange(Object.assign({}, transform, { config }))
  }

  onSecretsChange (_, secrets) {
    const { transform } = this.props
    this.props.onChange(Object.assign({}, transform, { secrets }))
  }

  panelSetter (panel) {
    return () => {
      this.setState({ panel })
    }
  }

  panelActive (panel) {
    return this.state.panel === panel
  }

  onAddTransform () {
    const { transform } = this.props
    this.props.onChange(Object.assign({}, transform, { syntax: 'skylark', script: starter }))
  }

  onRemoveTransform () {
    this.props.onChange({})
  }

  template (css) {
    const { panel } = this.state
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
          <span style={{ float: 'right' }}>
            <Button onClick={this.onRemoveTransform} color='b' text='Remove' />
          </span>
          <span>
            <a onClick={this.panelSetter('edit')} active={this.panelActive('edit')}>Edit</a>
            <a onClick={this.panelSetter('config')} active={this.panelActive('config')}>Config</a>
            <a onClick={this.panelSetter('secrets')} active={this.panelActive('secrets')}>Secrets</a>
          </span>
        </header>
        {panel === 'edit' &&
          <MonacoEditor
            language='python'
            theme='vs-dark'
            value={transform.script}
            options={options}
            onChange={this.onEditorChange}
            editorDidMount={this.editorDidMount}
          />}

        {panel === 'config' &&
          <div className={css('config')}>
            <h3>Config</h3>
            <KeyValueInput
              name='config'
              value={transform.config}
              onChange={this.onConfigChange}
            />
          </div>}

        {panel === 'secrets' &&
          <div className={css('config')}>
            <h3>Secrets</h3>
            <KeyValueInput
              name='secrets'
              value={transform.secrets}
              onChange={this.onSecretsChange}
            />
          </div>}
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
      config: {
        padding: 20
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
