import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'
import { isEmpty } from '../../utils/reflect'

import { defaultPalette } from '../../propTypes/palette'

import Base from '../Base'
import Button from '../chrome/Button'
import KeyValueInput from '../form/KeyValueInput'

const blankTransform = {
  syntax: 'skylark'
}

const starter = [
  '',
  'def transform(ds, ctx):',
  '  print("hello Qri! \\n")',
  '  ds.set_body(["this","is","dataset","data"])'
].join('\n')

export default class TransformEditor extends Base {
  constructor (props) {
    super(props)

    this.state = {
      panel: 'edit'
    };

    [
      'editorDidMount',
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

  onConfigChange (_, config) {
    const { transform } = this.props
    this.props.onChangeTransform(Object.assign({}, transform, { config }))
  }

  onSecretsChange (_, secrets) {
    const { transform } = this.props
    this.props.onChangeTransform(Object.assign({}, transform, { secrets }))
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
    this.props.onChangeTransform(blankTransform)
    this.props.onChangeScript(starter)
  }

  onRemoveTransform () {
    this.props.onChangeTransform(undefined)
    this.props.onChangeScript(undefined)
  }

  template (css) {
    const { panel } = this.state
    const { transform, script, onChangeScript } = this.props

    const options = {
      selectOnLineNumbers: true
    }

    if (isEmpty(transform)) {
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
        <header className={css('header')} >
          <span style={{ float: 'right' }}>
            <Button onClick={this.onRemoveTransform} color='b' text='Remove' />
          </span>
          <span className={css('panels')}>
            <a className={css('panelItem', this.panelActive('edit') && 'active')} onClick={this.panelSetter('edit')} >Edit</a>
            <a className={css('panelItem', this.panelActive('config') && 'active')} onClick={this.panelSetter('config')} >Config</a>
            <a className={css('panelItem', this.panelActive('secrets') && 'active')} onClick={this.panelSetter('secrets')} >Secrets</a>
          </span>
        </header>
        <div className={css('content')}>
          {panel === 'edit' &&
            <MonacoEditor
              language='python'
              theme='vs-dark'
              value={script || '\n\n'}
              options={options}
              onChange={onChangeScript}
              editorDidMount={this.editorDidMount}
            />}

          {panel === 'config' &&
            <div className={css('config')}>
              <h3 className='white' >Config</h3>
              <KeyValueInput
                name='config'
                value={transform.config}
                onChange={this.onConfigChange}
              />
            </div>}

          {panel === 'secrets' &&
            <div className={css('config')}>
              <h3 className='white' >Secrets</h3>
              <KeyValueInput
                name='secrets'
                value={transform.secrets}
                onChange={this.onSecretsChange}
              />
            </div>}
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      },
      config: {
        padding: 20
      },
      center: {
        width: 200,
        margin: '150px auto'
      },
      panels: {
        margin: '5px 0 5px 10px'
      },
      panelItem: {
        marginRight: 10,
        fontWeight: 'normal',
        color: defaultPalette.neutralMuted
      },
      active: {
        // fontWeight: 'bold',
        color: defaultPalette.a
      },
      header: {
        padding: 4,
        flex: '1 1 38px'
      },
      content: {
        flex: '2 1 100%'
      }
    }
  }
}

TransformEditor.propTypes = {
  transform: PropTypes.object,
  onChangeTransform: PropTypes.func.isRequired,
  script: PropTypes.string,
  onChangeScript: PropTypes.func.isRequired
}

TransformEditor.defaultProps = {
  transform: {}
}
