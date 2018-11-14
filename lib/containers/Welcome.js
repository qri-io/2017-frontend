import { connect } from 'react-redux'

import { acceptTos } from '../actions/app'
import Welcome from '../components/Welcome'

const WelcomeContainer = connect(
  (state, ownProps) => {
    return Object.assign({}, ownProps)
  }, {
    onAccept: acceptTos
  }
)(Welcome, 'Welcome')

export default WelcomeContainer
