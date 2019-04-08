import React from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'

export default class MetadataViewer extends React.PureComponent {
  constructor (props) {
    super(props)

    this.stdFields = [
      'title',
      'theme',
      'keywords',
      'description',
      'license',
      'accessPath',
      'language',
      'citations',
      'contributors',
      'accrualPeriodicity',
      'downloadPath',
      'homePath',
      'identifier',
      'readmePath',
      'version'
    ]

    this.ignoreFields = ['qri', 'path'];

    ['renderTable', 'renderValue'].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderTable (keys, data) {
    return (
      <div className='metadata-viewer-table-wrap'>
        <table className='metadata-viewer-table'>
          <tbody>
            {keys.map((key) => {
              return (
                <tr key={key} className='metadata-viewer-row'>
                  <td className='metadata-viewer-key' align='top'>{key}</td>
                  <td>{this.renderValue(data[key])}</td>
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
    const { metadata, stdOnly } = this.props

    const std = this.stdFields.filter((key) => !!metadata[key])
    const extra = Object.keys(metadata).filter((key) => {
      return !(~this.stdFields.findIndex((sKey) => (key === sKey)) || ~this.ignoreFields.findIndex((iKey) => (key === iKey)))
    })

    return (
      <div className='metadata-viewer-wrap'>
        <h5 className='metadata-viewer-title'>Standard Metadata</h5>
        {this.renderTable(std, metadata)}

        {!stdOnly && (extra.length > 0) && <div>
          <h5 className='metadata-viewer-title'>Additional Metadata</h5>
          {this.renderTable(extra, metadata)}
        </div>}
      </div>
    )
  }
}

MetadataViewer.propTypes = {
  metadata: PropTypes.object.isRequired,
  stdOnly: PropTypes.bool
}

MetadataViewer.defaultProps = {
  metadata: {},
  stdOnly: false
}
