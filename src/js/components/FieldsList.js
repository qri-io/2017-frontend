import React, { PropTypes } from 'react'

const FieldsList = ({ fields }) => {
  return (
    <div className='fields table'>
      {fields.map((field, i) => {
        return (
          <div key={i} className='field'>
            <h5 className='name blue'>{ field.name }</h5>
            <p className={`type dt-${field.type}`}>{field.type}</p>
          </div>
        )
      })}
    </div>
  )
}

FieldsList.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string
    })
  )
}

FieldsList.defaultProps = {
}

export default FieldsList
