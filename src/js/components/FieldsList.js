import React, { PropTypes } from 'react'
import { fieldsProps } from '../propTypes/datasetRefProps.js'

function descriptionTrigger (i, fn) {
  return () => {
    fn(i)
  }
}

function onMouseEnter (i) {
  console.log('entered ' + i + '!')
}

function onMouseLeave (i) {
  console.log('left ' + i + '!')
}

const FieldsList = ({ fields }) => {
  return (
    <div className='Row'>
      <div className='col-md-12'>
        {fields.map((field, i) => {
          return (
            <div key={i} className='field col-md-4'>
              <p className='purple' onMouseEnter={descriptionTrigger(i, onMouseEnter)} onMouseLeave={descriptionTrigger(i, onMouseLeave)}>{field.title || field.name}<span className={`type dt-${field.type}`}><small>                                                                                                                {field.type}</small></span>
              </p>
              { field.description ? <p id={`description-${i}`} className='description display-none'>{field.description}</p> : undefined }
            </div>
          )
        })}
      </div>
    </div>
  )
}

FieldsList.propTypes = {
  fields: fieldsProps
}

FieldsList.defaultProps = {
}

export default FieldsList
