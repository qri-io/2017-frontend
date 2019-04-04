/* globals window */
import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import { defaultPalette } from '../propTypes/palette'

import TopBar from '../containers/TopBar'

import AppDrag from './AppDrag'
import Base from './Base'
import AppLoading from './AppLoading'
import ChoosePeernameContainer from '../containers/ChoosePeername'
import AppUnavail from './AppUnavail'
import WelcomeContainer from '../containers/Welcome'

export default class App extends Base {
  constructor (props) {
    super(props);

    [
      'handleDismissClick',
      'handleDismissErrorClick',
      'handleStageClick',
      'handleMenuToggle',
      'handleHideModal',
      'modal'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  arrayIsNotEqual (a, b) {
    if (a === b) return false
    if (a === null || b === null) return true
    if (a.length !== b.length) return true

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return true
    }

    return false
  }

  componentDidMount () {
    if (this.props.apiConnection === 0) {
      var iter = 0
      this._pingTimer = setInterval(() => {
        if (iter > 30) {
          this.props.apiConnectionFail()
          clearInterval(this._pingTimer)
        }
        this.props.pingApi()
        iter++
      }, 850)
    }

    this._oldResize = window.onresize
    // debounce device resizing to not be a jerk on resize
    window.onresize = debounce(() => {
      this.props.layoutResize(window.innerWidth, window.innerHeight)
    }, 250)

    // TODO (b5) - restore. Currently disabled b/c in electron land we're getting this problem:
    // https://stackoverflow.com/questions/45827709/confirm-beforeunload-in-electron
    // window.onbeforeunload = (e) => {
    //   if (this.props.editorDirty) {
    //     if (!confirm('the editor has unsaved changes. are you sure want to close this window?')) {
    //       e.preventDefault()
    //       e.returnValue = ''
    //       return false
    //     }
    //   }
    // }

    // initial call to make things not crazy
    this.props.layoutResize(window.innerWidth, window.innerHeight)
  }

  componentWillUnmount () {
    window.onresize = this._oldResize
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.apiConnection && this.props.apiConnection) {
      this.props.loadSessionProfile()
      clearInterval(this._pingTimer)
    } else if (this.props.sessionProfile && prevProps.sessionProfile !== this.props.sessionProfile) {
      this.props.loadDatasets(this.props.sessionProfile)
      this.props.loadProfiles()
      this.props.loadRegistryDatasets()
    }
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
  renderModal (css) {
    return (
      <div onClick={this.handleStageClick}>
        <div
          id='modal-wrap'
          className={this.props.modal ? 'modal-wrap-in' : 'modal-wrap-out'} />
        <div
          id='modal'
          className={`dialog ${this.props.modal ? 'modal-in' : 'modal-out'}`}
          tabIndex='-1'
          role='dialog'
          onClick={(e) => { e.stopPropagation() }}>
          {this.props.modal && this.props.modal.element ? this.props.modal.element.modal(this.props.modal.name, this.props.modal.data) : undefined}
        </div>
      </div>
    )
  }

  renderErrorMessage (css) {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <div className={css('alert', 'danger')} role='alert'>
        <div className={css('message')}>{errorMessage}</div>
        <div className={css('dismiss')}><a className='white icon-inline' onClick={this.handleDismissErrorClick}>close</a></div>
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
        <div className={css('message')}>{message}</div>
        <div className={css('dismiss')}><a className='white icon-inline' onClick={this.handleDismissClick}>close</a></div>
      </div>
    )
  }

  template (css) {
    const { children, layout, apiConnection, acceptedTOS, hasSetPeername, profile } = this.props

    if (!acceptedTOS) {
      return <WelcomeContainer />
    }

    if (profile && !hasSetPeername) {
      return <ChoosePeernameContainer />
    }

    if (apiConnection === -1) {
      return <AppUnavail />
    }

    if (!apiConnection) {
      return <AppLoading />
    }

    // {this.props.sessionProfile ? <Menu palette={palette} location={location} use fdr={user} style={layout.sidebar} /> : undefined}
    return (
      <div className={css('app')} >
        {this.renderMessage(css)}
        {this.renderErrorMessage(css)}
        <AppDrag />
        <TopBar profile={profile} />
        <div
          className='main'
          style={Object.assign({
            position: 'relative',
            overflow: 'auto'
          }, layout.main)}
        >
          {children}
        </div>
        {this.renderModal(css)}
      </div>
    )
  }

  styles (props) {
    const palette = defaultPalette

    return {
      app: {
        background: palette.background,
        minHeight: '100%',
        color: palette.text,
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)'
      },

      alert: {
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        position: 'fixed',
        left: 0,
        bottom: 0,
        margin: 20,
        overflow: 'auto',
        zIndex: 10,
        minWidth: '200',
        maxWidth: '40%',
        padding: '10px 15px 10px 15px',
        borderRadius: 3,
        boxShadow: '0 0 8px rgba(0,0,0,0.5)'
      },
      danger: {
        background: palette.error
      },
      success: {
        background: palette.primary
      },
      message: {
        overflow: 'auto'
      },
      dismiss: {
        paddingLeft: 20
      },
      modal: {
        zIndex: 5,
        boxShadow: `0 0 8px rgba(0, 0, 0, 0.3)`,
        background: palette.background,
        borderRadius: 6,
        padding: 15,
        minWidth: 400,
        maxWidth: 600,
        position: `absolute`,
        width: `35%`,
        maxHeight: '50%',
        overflowY: `auto`,
        margin: `4.5rem auto auto auto`,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      large: {
        maxHeight: '80%',
        width: 'auto'
      },
      thin: {
        maxHeight: '80%'
      }
    }
  }
}

App.propTypes = {
  editorDirty: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
  sessionProfile: PropTypes.string,

  resetErrorMessage: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  hideMenu: PropTypes.func.isRequired,
  loadSessionProfile: PropTypes.func.isRequired,

  apiConnection: PropTypes.number.isRequired,
  goBack: PropTypes.func,
  goForward: PropTypes.func
}

App.defaultProps = {
}
