import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import { loadSessionUser } from '../actions/session'
import { resizeDevice } from '../actions/device'
import { selectSessionUser } from '../selectors/session'
import { debounce } from 'lodash'

import Navbar from '../components/Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  componentWillMount() {
    this.props.loadSessionUser()

    this._oldResize = window.onresize
    // debounce device resizing to not be a jerk on resize
    window.onresize = debounce((e) => {
      this.props.resizeDevice(window.innerWidth, window.innerHeight)
    }, 200)

    // intial call to make things not crazy
    this.props.resizeDevice(window.innerWidth, window.innerHeight)
  }

  componentWillUnmount() {
    window.onresize = this._oldResize
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <div className="alert alert-warning" role="alert">
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </div>
    )
  }

  render() {
    const { children, inputValue, user } = this.props
    return (
      <div>
        <Navbar user={user} />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  user : PropTypes.object,

  resetErrorMessage: PropTypes.func.isRequired,
  loadSessionUser: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1),
    user : selectSessionUser(state)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  loadSessionUser,
  resizeDevice
})(App)