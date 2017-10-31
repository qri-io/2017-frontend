/* globals window */
import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { debounce } from 'lodash'

import { Palette, defaultPalette } from '../propTypes/palette'

import Base from './Base'
import Header from './Header'
import Menu from './Menu'
import AppLoading from './AppLoading'

export default class App extends Base {
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
    if (this.props.apiConnection === 0) {
      this._pingTimer = setInterval(() => {
        this.props.pingApi()
      }, 850)
    }

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

  componentWillReceiveProps (nextProps) {
    if (!this.props.apiConnection && nextProps.apiConnection) {
      clearInterval(this._pingTimer)
    }
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

  renderErrorMessage (css) {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <div className={css('alert', 'danger')} role='alert'>
        <div className='row'>
          <div className={css('dismiss')}><a onClick={this.handleDismissErrorClick}>X</a></div>
          <div className={css('message')}>{errorMessage}</div>
        </div>
      </div>
    )
  }

  renderMessage (css) {
    const { message } = this.props
    if (!message) {
      return null
    }

    return (
      <div className={css('alert', 'success')} role='alert'>
        <div className='row'>
          <div className={css('dismiss')}><a onClick={this.handleDismissClick}>X</a></div>
          <div className={css('message')}>{message}</div>
        </div>
      </div>
    )
  }

  template (css) {
    const { children, layout, palette, apiConnection, location } = this.props

    if (!apiConnection) {
      return <AppLoading />
    }

    return (
      <div className={css('app')} onClick={this.handleStageClick}>
        {this.renderMessage(css)}
        {this.renderErrorMessage(css)}
        <Header palette={palette} style={layout.navbar} />
        <Menu palette={palette} location={location} style={layout.sidebar} />
        <div
          className='main'
          style={Object.assign({
            position: 'relative',
            overflow: 'auto'
          }, layout.main)}
        >
          {children}
        </div>
        {this.renderModal()}
      </div>
    )
  }

  styles (props) {
    const { palette } = this.props

    return {
      app: {
        background: palette.background,
        minHeight: '100%',
        color: palette.text

        // TODO - wouldn't this be nice? it'd be great to set
        // child class selectors & not have to pass palette
        // props everywhere.
        // '.pal_a_bg': { background: palette.a },
        // '.pal_b_bg': { background: palette.b },
        // '.pal_c_bg': { background: palette.c },
        // '.pal_d_bg': { background: palette.d },
        // '.pal_e_bg': { background: palette.e },

        // '.pal_a_text': { color: palette.a },
        // '.pal_b_text': { color: palette.b },
        // '.pal_c_text': { color: palette.c },
        // '.pal_d_text': { color: palette.d },
        // '.pal_e_text': { color: palette.e },
      },

      alert: {
        marginBottom: 0,
        position: 'fixed',
        right: 0,
        margin: '30px 20px',
        overflow: 'auto',
        zIndex: '2',
        minWidth: '200',
        maxWidth: '40%',
        padding: '10px 15px 10px 15px'
      },
      danger: {
        background: palette.d
      },
      success: {
        background: palette.c
      },
      message: {
        float: 'left',
        display: 'inline-block',
        marginLeft: 10,
        marginRight: 10
      },
      dismiss: {
        float: 'right',
        display: 'inline-block',
        margin: '0 10px 0 0'
      }
    }
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,

  resetErrorMessage: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
  apiConnection: PropTypes.number.isRequired,
  palette: Palette
}

App.defaultProps = {
  palette: defaultPalette
}
