/* globals window */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { debounce } from 'lodash'
import { hideMenu, resetMessage, resetErrorMessage, showModal, hideModal } from '../actions/app'
import { layoutResize } from '../actions/layout'
import { loadSessionUser } from '../actions/session'

import { selectSessionUser } from '../selectors/session'

import Header from '../components/Header'

class App extends Component {
  constructor (props) {
    super(props);

    [
      'handleChange',
      'handleDismissClick',
      'handleDismissErrorClick',
      'handleStageClick',
      'handleMenuToggle',
      'handleHideModal',
      'modal'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    // this.props.loadSessionUser()

    this._oldResize = window.onresize
    // debounce device resizing to not be a jerk on resize
    window.onresize = debounce(() => {
      this.props.layoutResize(window.innerWidth, window.innerHeight)
    }, 250)

    // initial call to make things not crazy
    this.props.layoutResize(window.innerWidth, window.innerHeight)
  }

  componentWillUnmount () {
    window.onresize = this._oldResize
  }

  handleChange (nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  handleDismissErrorClick (e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleDismissClick (e) {
    this.props.resetMessage()
    e.preventDefault()
  }

  handleMenuToggle (e) {
    e.stopPropagation()
    this.props.toggleMenu()
  }
  handleStageClick () {
    if (this.props.showMenu) {
      this.props.hideMenu()
    }
    if (this.props.modal) {
      this.props.hideModal()
    }
  }

  handleHideModal () {
    this.props.hideModal()
  }

  /* app implements the modal pattern as well as using it */
  modal (name, data = {}) {
    switch (name) {
      default:
        return undefined
    }
  }

  /**
   * presenting modals is easy! fun even! yay! import showModal from actions/app, and call it with ("name", [element that will present modal], [data object])
   * it's expected that the element that presents the modal will have a method "modal", that will return either a react element or undefined
   * Whatever it gives back will be presented
   */
  renderModal () {
    if (this.props.modal) {
      return (
        <div id='modal-wrap'>
          <div className={`modal dialog ${this.props.modal.large && 'large'}`} tabIndex='-1' role='dialog' onClick={(e) => { e.stopPropagation() }}>
            {this.props.modal.element ? this.props.modal.element.modal(this.props.modal.name, this.props.modal.data) : undefined}
          </div>
        </div>
      )
    }
    return undefined
  }

  renderErrorMessage () {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <div className='alert alert-danger' role='alert'>
        <div className='row'>
          <div className='dismiss'><a onClick={this.handleDismissErrorClick}>X</a></div>
          <div className='message'>{errorMessage}</div>
        </div>
      </div>

    )
  }

  renderMessage () {
    const { message } = this.props
    if (!message) {
      return null
    }

    return (
      <div className='alert alert-success' role='alert'>
        <div className='row'>
          <div className='dismiss'><a onClick={this.handleDismissClick}>X</a></div>
          <div className='message'>{message}</div>
        </div>
      </div>
    )
  }

  render () {
    const { children, layout } = this.props
    return (
      <div id='app' className='stage' onClick={this.handleStageClick}>
        {this.renderMessage()}
        {this.renderErrorMessage()}
        <Header style={Object.assign({
          position: 'absolute',
          overflow: 'auto'
        }, layout.navbar)} />
        <div
          className='main'
          style={Object.assign({
            position: 'absolute',
            overflow: 'auto'
          }, layout.main)}
        >
          {children}
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node,

  resetErrorMessage: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    message: state.message,
    errorMessage: state.errorMessage,
    // inputValue: ownProps.location.pathname.substring(1),
    user: selectSessionUser(state),
    showMenu: state.app.showMenu,
    layout: state.layout,

    modal: state.app.modal
  }
}

export default connect(mapStateToProps, {
  resetMessage,
  resetErrorMessage,
  loadSessionUser,
  layoutResize,
  hideMenu,
  showModal,
  hideModal
})(App)
