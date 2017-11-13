import PropTypes from 'prop-types'

// bbox represents a css bounding box (position: :absolute")
export default PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
  collapsed: PropTypes.bool
})
