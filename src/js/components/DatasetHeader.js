import React, { PropTypes } from 'react'

import { datasetProps } from '../propTypes/datasetRefProps.js'

const DatasetHeader = ({ name, dataset, onDelete }) => {
  return (
    <div className='row'>
      <header className='blue page-header col-md-12'>
        <hr className='blue' />
        <a className='green right' href={`/downloads/package?path=${dataset.path}`}>Download</a>
        { onDelete && <a className='red right' onClick={onDelete}>Delete&nbsp;</a> }
        <h1>{ name }</h1>
        { dataset.title ? <h2>{ dataset.title }</h2> : undefined }
        <p className='path'>{dataset.path}</p>
        <p>
          { dataset.sourceUrl ? <span>| <a href={dataset.sourceUrl} rel='noopener noreferrer' target='_blank'>{dataset.sourceUrl}</a></span> : undefined }
        </p>
      </header>
    </div>
  )
}

DatasetHeader.propTypes = {
  // dataset data model
  name: PropTypes.string,
  dataset: datasetProps,
  onDelete: PropTypes.func
}

DatasetHeader.defaultProps = {
}

export default DatasetHeader
