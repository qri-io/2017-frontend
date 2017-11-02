import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  twitter: PropTypes.string
})
