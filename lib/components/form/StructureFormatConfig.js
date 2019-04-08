import React from 'react'
import PropTypes from 'prop-types'

export default class StructureFormatConfig extends React.PureComponent {
  constructor (props) {
    super(props);

    [
      'renderCSV',
      'onChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onChange (name, value) {
    const { formatConfig } = this.props
    this.props.onChange('formatConfig', Object.assign({}, formatConfig, { [name]: value }))
  }

  renderCSV () {
    const { formatConfig } = this.props

    return (
      <div className='form-wrap'>
        <h3>Configure CSV format:</h3>
        <div>
          <h5 style={{ color: 'white' }}>header row: <input name='headerRow' type='checkbox' onChange={(e) => { this.onChange('headerRow', e.target.checked) }} checked={!!formatConfig.headerRow} /></h5>
          <small><i>Whether CSV body has a header row</i></small>
        </div>
        <br />
        <div>
          <h5 style={{ color: 'white' }}>lazy quotes: <input name='lazyQuotes' type='checkbox' onChange={(e) => { this.onChange('lazyQuotes', e.target.checked) }} checked={!!formatConfig.lazyQuotes} /></h5>
          <small><i>Whether CSV data should be interpreted both with &amp; without quoted fields</i></small>
        </div>
        <br />
        <div>
          <h5 style={{ color: 'white' }}>variadic fields: <input name='variadicFields' type='checkbox' onChange={(e) => { this.onChange('variadicFields', e.target.checked) }} checked={!!formatConfig.variadicFields} /></h5>
          <small><i>permits records to have a variable number of fields. avoid using this if you can.</i></small>
        </div>
        <hr />
      </div>
    )
  }

  render () {
    const { format } = this.props

    switch (format) {
      case 'csv':
        return this.renderCSV()
      default:
        return <div />
    }
  }
}

StructureFormatConfig.propTypes = {
  format: PropTypes.string,
  formatConfig: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

StructureFormatConfig.defaultProps = {
  formatConfig: {}
}
