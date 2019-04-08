import React from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'

export default class StructureViewer extends React.PureComponent {
  constructor (props) {
    super(props)

    this.stdFields = [
      'checksum',
      'errCount',
      'entries',
      'format',
      'length'
    ]

    this.ignoreFields = ['qri', 'path', 'schema'];

    ['renderTable', 'renderValue'].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderTable (keys, data) {
    return (
      <div className='structure-viewer-table-wrap'>
        <table className='structure-viewer-table'>
          <tbody>
            {keys.map((key) => {
              return (
                <tr key={key} className='structure-viewer-row'>
                  <td className='structure-viewer-key' valign='top'>{key}</td>
                  <td className='structure-viewer-value'>{this.renderValue(data[key])}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  renderValue (value) {
    switch (typeof value) {
      case 'string':
      case 'number':
        return <span>{value}</span>
      case 'object':
      case 'array':
        return <Json body={value} />
      default:
        return <span>{JSON.stringify(value)}</span>
    }
  }

  render () {
    const { structure, stdOnly } = this.props

    const std = this.stdFields.filter((key) => !!structure[key])
    const extra = Object.keys(structure).filter((key) => {
      return !(~this.stdFields.findIndex((sKey) => (key === sKey)) || ~this.ignoreFields.findIndex((iKey) => (key === iKey)))
    })

    return (
      <div className='structure-viewer-wrap'>
        <h5 className='structure-viewer-title'>Structure</h5>
        {this.renderTable(std, structure)}

        {!stdOnly && (extra.length > 0) && <div>
          <h5 className='structure-viewer-title'>Schema</h5>
          {this.renderTable(extra, structure)}
        </div>}

        <h5 className='structure-viewer-title'>Schema</h5>
        <Json body={structure.schema} />
      </div>
    )
  }
}

StructureViewer.propTypes = {
  structure: PropTypes.object.isRequired,
  stdOnly: PropTypes.bool
}

StructureViewer.defaultProps = {
  structure: {},
  stdOnly: false
}
