import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import { loadSessionUser } from '../actions/session'
import { selectSessionUser } from '../selectors/session'

import Navbar from '../components/Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  componentWillMount() {
    this.props.loadSessionUser()
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
  loadSessionUser
})(App)