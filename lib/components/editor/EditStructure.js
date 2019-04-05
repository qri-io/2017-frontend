import React from 'react'
import PropTypes from 'prop-types'

import Button from '../chrome/Button'

import StructureForm from '../form/StructureForm'

export default class EditStructure extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'onChange',
      'onRemoveStructure',
      'onAddStructure'
    ].forEach(m => { this[m] = this[m].bind(this) })
  }

  onChange (key, value) {
    const { structure } = this.props
    this.props.onChangeStructure(Object.assign({}, structure, { [key]: value }))
  }

  onRemoveStructure () {
    this.props.onRemove('structure')
  }

  onAddStructure () {
    this.props.onChangeStructure({
      format: 'json'
    })
    this.props.onChangeSchema('')
  }

  render () {
    const { structure, onChangeSchema, layout } = this.props
    var schema = structure.schema
    if (typeof schema !== 'string') {
      schema = JSON.stringify(schema, null, 2)
    } else if (!schema) {
      schema = ''
    }
    if (!Object.keys(structure).length) {
      return (
        <div className='edit-structure-wrap'>
          <div className='edit-structure-center'>
            <Button onClick={this.onAddStructure} color='b' text='Add Structure' />
          </div>
        </div>
      )
    }

    return (
      <div className='edit-structure-wrap'>
        <header className='edit-structure-header'>
          <Button onClick={this.onRemoveStructure} color='b' text='Remove' />
        </header>
        <div className='edit-structure-content'>
          <StructureForm
            structure={structure}
            onChange={this.onChange}
            schema={schema}
            onChangeSchema={onChangeSchema}
            layout={layout}
            showHelpText
          />
        </div>
      </div>
    )
  }
}

EditStructure.propTypes = {
  structure: PropTypes.object,
  onChangeStructure: PropTypes.func.isRequired
}

EditStructure.defaultProps = {
  structure: {}
}
