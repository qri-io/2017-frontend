import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  created: PropTypes.string,
  updated: PropTypes.string,
  username: PropTypes.string,
  type: PropTypes.string,
  emails: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  homeUrl: PropTypes.string,
  color: PropTypes.string,
  thumbUrl: PropTypes.string,
  profileUrl: PropTypes.string,
  twitter: PropTypes.string
})
