import PropTypes from 'prop-types'
import { userProps } from './metaProps'

export default PropTypes.shape({
  author: userProps,
  message: PropTypes.string,
  path: PropTypes.string,
  qri: PropTypes.oneOf(['cm:0']),
  signature: PropTypes.string,
  timestamp: PropTypes.string,
  title: PropTypes.string
})
