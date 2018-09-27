import React from 'react'
import PropTypes from 'prop-types'

import Base from '../Base'
// import Button from '../chrome/Button'
import StructureForm from '../form/StructureForm'

export default class EditStructure extends Base {
  constructor (props) {
    super(props);

    [
      'onChange'
    ].forEach(m => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (!Object.keys(this.props.structure).length) {
      this.props.onChangeStructure({
        format: 'json',
        schema: { type: 'array' }
      })
    }
  }

  onChange (key, value) {
    const { structure } = this.props
    this.props.onChangeStructure(Object.assign({}, structure, { [key]: value }))
  }

  template (css) {
    const { structure } = this.props

    return (
      <div className={css('wrap')}>
        <div className={css('content')}>
          <StructureForm
            structure={structure}
            onChange={this.onChange}
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
        padding: 4
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
