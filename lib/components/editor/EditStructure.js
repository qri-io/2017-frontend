import React from 'react'
import PropTypes from 'prop-types'

import Button from '../chrome/Button'
import Base from '../Base'
import StructureForm from '../form/StructureForm'

export default class EditStructure extends Base {
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

  template (css) {
    const { structure, onChangeSchema } = this.props
    var schema = structure.schema
    if (typeof schema !== 'string') {
      schema = JSON.stringify(schema, null, 2)
    } else if (!schema) {
      schema = ''
    }
    if (!Object.keys(structure).length) {
      return (
        <div className={css('wrap')}>
          <div className={css('center')}>
            <Button onClick={this.onAddStructure} color='b' text='Add Structure' />
          </div>
        </div>
      )
    }

    return (
      <div className={css('wrap')}>
        <header className={css('header')}>
          <Button onClick={this.onRemoveStructure} color='b' text='Remove' />
        </header>
        <div className={css('content')}>
          <StructureForm
            structure={structure}
            onChange={this.onChange}
            schema={schema}
            onChangeSchema={onChangeSchema}
            showHelpText
          />
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      center: {
        width: 200,
        margin: '150px auto'
      },
      header: {
        flex: '1 1 30px',
        padding: '10px 4px 2px 10px',
        display: 'flex',
        justifyContent: 'flex-end'
      },
      content: {
        flex: '2 1 95%',
        padding: 20,
        width: '100%',
        overflow: 'auto'
      }
    }
  }
}

EditStructure.propTypes = {
  structure: PropTypes.object,
  onChangeStructure: PropTypes.func.isRequired
}

EditStructure.defaultProps = {
  structure: {}
}
