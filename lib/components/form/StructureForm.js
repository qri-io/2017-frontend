import React from 'react'
import PropTypes from 'prop-types'
import MonacoEditor from 'react-monaco-editor'

import ExternalLink from '../ExternalLink.APP_TARGET'
// import ValidTextarea from './ValidTextarea'
// import ValidSelect from './ValidSelect'
// import StructureFormatConfig from './StructureFormatConfig'
// import EditSchema from '../schema/EditSchema'

export default class StructureForm extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'onChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChange (name, value) {
    this.props.onChange(name, value)
  }

  render () {
    const { schema, onChangeSchema, layout } = this.props
    // const { structure, validation, onChange, showHelpText, onChangeSchema } = this.props
    const options = {
      selectOnLineNumbers: true
    }

    return (
      <div>
        {/* removing the option for users to choose csv. All frontend structures will be
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
      */}
        <div>
          <h3>Schema</h3>
          <p>schemas are expressed as a <ExternalLink href='https://json-schema.org' target='_blank'>json-schema</ExternalLink></p>
          <MonacoEditor
            language='json'
            theme='vs-dark'
            value={schema}
            options={options}
            onChange={onChangeSchema}
            height={layout.height - 100}
            // editorDidMount={this.editorDidMount}
          />
        </div>
      </div>
    )
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
