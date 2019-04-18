import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

// Dropdown is a dropdown menu, made from a Qri button, a html button (with a carot) and a passed in dropdown component
const Dropdown = ({ color, onClick, loading, text, download, disabled, options, downloadName, onChooseOption, DropdownMenu }) => {
  const [display, setDisplay] = useState(false)
  const onClickOption = (opt) => {
    setDisplay(false)
    onChooseOption(opt)
  }
  const className = 'btn btn-' + color

  return (
    <div className='dropdown dropdown-wrap'>
      <div>
        <Button
          loading={loading}
          onClick={onClick}
          text={text}
          color={color}
          download={download}
          downloadName={downloadName}
          disabled={disabled}
          attached
        />
        <button
          className={`icon-inline ${className} dropdown-caret dropdown-toggle`}
          type='button'
          onClick={() => setDisplay(!display)}
        >
          dropdown
        </button>
      </div>
      <div>
        <DropdownMenu display={display} options={options} onChooseOption={onClickOption} />
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  // options: options to display in the dropdown menu
  options: PropTypes.array,
  // onChooseOption: function that gets triggered when you choose an option (not when you click the button)
  onChooseOption: PropTypes.func,
  // text: the text that is displayed on the dropdown button
  text: PropTypes.string.isRequired,
  // color: the color of the button, default is 'primary'
  color: PropTypes.string,
  // onClick: the function that fires when the dropdown button is clicked
  onClick: PropTypes.func,
  // dropdown: the component that gets displayed when you show the dropdown menu
  dropdown: PropTypes.func,
  // download: the href that would get passed down to the Button
  download: PropTypes.string,
  // downloadName: name that would get passed down to the Button
  downloadName: PropTypes.string
}

Dropdown.defaultProps = {
  color: 'primary'
}

export default Dropdown
