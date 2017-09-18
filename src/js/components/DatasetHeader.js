import React, { PropTypes } from 'react'

const DatasetHeader = ({ dataset, onDelete }) => {
  return (
    <div className='row'>
      <header className='blue page-header col-md-12'>
        <hr className='blue' />
        <a className='green right' href={`/downloads/package?path=${dataset.path}`}>Download</a>
        { onDelete && <a className='red right' onClick={onDelete}>Delete&nbsp;</a>}
        <h1>{dataset.title || 'unnamed dataset'}</h1>
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
  dataset: PropTypes.object.isRequired
}

DatasetHeader.defaultProps = {
}

export default DatasetHeader
