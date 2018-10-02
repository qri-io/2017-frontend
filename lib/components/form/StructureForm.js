import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

import Base from '../Base'

// import ValidTextarea from './ValidTextarea'
import ValidSelect from './ValidSelect'
import StructureFormatConfig from './StructureFormatConfig'
// import EditSchema from '../schema/EditSchema'

export default class StructureForm extends Base {
  constructor (props) {
    super(props);

    [
      'onChange',
      'onChangeSchema'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChange (name, value) {
    this.props.onChange(name, value)
  }

  onChangeSchema (value) {
    this.props.onChange('schema', value)
  }

  template (css) {
    const { structure, validation, onChange, showHelpText } = this.props
    const options = {
      selectOnLineNumbers: true
    }

    let schema = structure.schema
    if (schema.constructor === Object) {
      schema = JSON.stringify(schema)
    }

    return (
      <div className='structure form'>
        <div className='form-wrap'>
          <ValidSelect
            name='format'
            label='Data Format'
            helpText='What form the dataset body will be stored in'
            showHelpText={showHelpText}
            value={structure.format}
            error={validation.format}
            onChange={onChange}
            className='col-md-6'
            options={['csv', 'json']}
            allowEmpty={false}
            labelTop
          />
        </div>
        <StructureFormatConfig
          format={structure.format}
          formatConfig={structure.formatConfig}
          onChange={this.onChange}
        />
        <div>
          <h3>Schema</h3>
          <p>schemas are expressed as a <a href='https://json-schema.org'>json-schema</a></p>
          <MonacoEditor
            language='json'
            theme='vs-dark'
            value={schema}
            options={options}
            onChange={this.onChangeSchema}
            // editorDidMount={this.editorDidMount}
          />
        </div>
      </div>
    )
  }
  styles () {
    return {
      cancel: {
        marginLeft: 10,
        display: 'inline-block'
      },
      wrap: {
        marginBottom: 20,
        width: '100%'
      }
    }
  }
}

StructureForm.propTypes = {
  structure: PropTypes.object,
  showHelpText: PropTypes.bool,

  onChange: PropTypes.func.isRequired
}

StructureForm.defaultProps = {
  validation: {
    title: '',
    description: ''
  },
  showHelpText: false
}
