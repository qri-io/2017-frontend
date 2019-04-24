/* globals __BUILD__ */
import React, { useState } from 'react'

import PropTypes from 'prop-types'
import Button from '../chrome/Button'
import ValidSelect from '../form/ValidSelect'
import RadioInput from '../form/RadioInput'

const ExportDataset = (props) => {
  const { datasetRef, onCancel } = props
  const { peername, name, path } = datasetRef

  const [format, setFormat] = useState('')
  const [exportType, setExportType] = useState('export')

  var exportPath = `${__BUILD__.API_URL}/${exportType}/${peername}/${name}`
  if (path && path !== '/') {
    exportPath += `/at${path}`
  }
  if (exportType === 'body') {
    exportPath += '?download=true&all=true'
  }
  if (format) {
    exportPath += exportPath.includes('?') ? '&' : '?'
    exportPath += 'format=' + format
  }

  const exportOptions = [{ value: '', text: 'default' }, 'json', 'yaml', 'xlsx', 'cbor']
  const bodyOptions = [{ value: '', text: 'default' }, 'json', 'csv', 'xlsx', 'cbor']

  return (
    <div className='white rename-dataset-wrap'>
      <h1 className='white'>Export Dataset</h1>
      <div className='export-dataset-radio' >
        <RadioInput
          name='type'
          value='dataset'
          text='Export full dataset'
          onChange={() => setExportType('export')}
          defaultChecked
        />
        <RadioInput
          name='type'
          value='body'
          text='Export just the body'
          onChange={() => setExportType('body')}
        />
      </div>
      <div className='rename-dataset-form-wrap' >
        <ValidSelect
          name='format'
          options={exportType === 'export' ? exportOptions : bodyOptions}
          value={format}
          onChange={(name, value, event) => setFormat(value)}
          label='Export Format:'
          white
          allowEmpty={false}
          labelTop
        />
        <div className='export-dataset-buttons'>
          <Button
            download={exportPath}
            text='Export'
          />
          <a
            onClick={onCancel}
            className='white'
          >Cancel</a>
        </div>
      </div>
    </div>
  )
}

ExportDataset.propTypes = {
  exportPath: PropTypes.string
}

ExportDataset.defaultProps = {
}

export default ExportDataset
