/* globals window, confirm */
import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { debounce } from 'lodash'

import { defaultPalette } from '../propTypes/palette'

import TopBar from '../containers/TopBar'

import AppDrag from './AppDrag'
import Base from './Base'
import AppLoading from './AppLoading'
import AppUnavail from './AppUnavail'
import WelcomeContainer from '../containers/Welcome'

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

  arrayIsNotEqual (a, b) {
    if (a === b) return false
    if (a === null || b === null) return true
    if (a.length !== b.length) return true

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return true
    }

    return false
  }

  componentWillMount () {
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

    window.onbeforeunload = (e) => {
      if (this.props.editorDirty) {
        if (!confirm('the editor has unsaved changes. are you sure want to close this window?')) {
          e.preventDefault()
          e.returnValue = ''
          return false
        }
      }
    }

    // initial call to make things not crazy
    this.props.layoutResize(window.innerWidth, window.innerHeight)
  }

  componentWillUnmount () {
    window.onresize = this._oldResize
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.apiConnection && nextProps.apiConnection) {
      this.props.loadSessionProfile()
      clearInterval(this._pingTimer)
    } else if (nextProps.sessionProfile && this.props.sessionProfile !== nextProps.sessionProfile) {
      this.props.loadDatasets(nextProps.sessionProfile)
      this.props.loadProfiles()
    } else if (this.arrayIsNotEqual(nextProps.datasetIds, this.props.datasetIds)) {
      nextProps.datasets.forEach(datasetRef => this.props.loadHistoryByName(datasetRef.peername, datasetRef.name))
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
  renderModal (css) {
    if (this.props.modal) {
      return (
        <div id='modal-wrap'>
          <div className={`${css('modal')} dialog ${this.props.modal.large ? css('large') : ''} ${this.props.modal.thin ? css('thin') : ''}`} tabIndex='-1' role='dialog' onClick={(e) => { e.stopPropagation() }}>
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
    const { children, layout, apiConnection, acceptedTOS } = this.props

    if (!acceptedTOS) {
      return <WelcomeContainer />
    }
    if (apiConnection === -1) {
      return <AppUnavail />
    }

    if (!apiConnection) {
      return <AppLoading />
    }

    // {this.props.sessionProfile ? <Menu palette={palette} location={location} use fdr={user} style={layout.sidebar} /> : undefined}
    return (
      <div className={css('app')} onClick={this.handleStageClick}>
        {this.renderMessage(css)}
        {this.renderErrorMessage(css)}
        <AppDrag />
        <TopBar />
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
        marginBottom: 0,
        position: 'fixed',
        right: 0,
        margin: '80px 20px',
        overflow: 'auto',
        zIndex: 2,
        minWidth: '200',
        maxWidth: '40%',
        padding: '10px 15px 10px 15px',
        borderRadius: 3,
        boxShadow: '0 0 8px rgba(0,0,0,0.5)'
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
