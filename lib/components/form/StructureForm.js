import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'

import ValidTextarea from './ValidTextarea'
import ValidSelect from './ValidSelect'

export default class StructureForm extends Base {
  constructor (props) {
    super(props);

    [
      'onChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChange (name, value) {
    if (name === 'schema') {
      value = JSON.parse(value)
    }
    this.props.onChange(name, value)
  }

  template (css) {
    const { structure, validation, onChange, showHelpText } = this.props

    return (
      <div className='structure form' style={{ marginTop: 20, maxWidth: 600 }}>
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
        <div className='form-wrap'>
          <ValidTextarea
            name='schema'
            label='Schema'
            helpText='JSON-schema data'
            showHelpText={showHelpText}
            value={JSON.stringify(structure.schema)}
            error={validation.schema}
            onChange={onChange}
            labelTop
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
