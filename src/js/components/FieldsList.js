import React, { PropTypes } from 'react'
import { fieldsProps } from '../propTypes/datasetRefProps.js'

const FieldsList = ({ fields }) => {
  return (
    <div className='fields table'>
      {fields.map((field, i) => {
        return (
          <div key={i} className='field'>
            <h5 className='inline-block name blue'>{field.title || field.name}</h5>
            <p className={`inline-block type dt-${field.type}`}>{field.type}</p>
            { field.description ? <p className='description'>{field.description}</p> : undefined }
          </div>
        )
      })}
    </div>
  )
}

FieldsList.propTypes = {
  fields: fieldsProps
}

FieldsList.defaultProps = {
}

export default FieldsList
