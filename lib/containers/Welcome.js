/* globals alert */
import { connect } from 'react-redux'

import { acceptTos } from '../actions/app'
import Welcome from '../components/Welcome'

const WelcomeContainer = connect(
  (state, ownProps) => {
    return Object.assign({}, ownProps)
  }, {
    onAccept: acceptTos,
    onCancel: function () {
      alert('bye!')
    }
  }
)(Welcome, 'Welcome')

export default WelcomeContainer
