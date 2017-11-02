/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'

const DropFile = ({ name, disabled, onChange, value }) => {
  const handleChange = (e) => {
    onChange(name, e.target.files, e)
  }

  return (
    <div className='uploader'>
      <input
        name='file'
        type='file'
        disabled={disabled}
        className='form-control'
        onChange={handleChange}
      />
    </div>
  )
}

DropFile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

DropFile.defaultProps = {
  name: 'file'
}

export default DropFile
