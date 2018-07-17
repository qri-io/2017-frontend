import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import Spinner from './Spinner'
import SearchBar from './form/SearchBar'
import ViewModeButton from './form/ViewModeButton'
import Base from './Base'

export default class TopBar extends Base {
  constructor (props) {
    super(props);

    [
      'handleGoBack',
      'handleGoForward',
      'handleSetViewMode'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleGoBack () {
    this.props.goBack && this.props.goBack()
  }
  handleGoForward () {
    this.props.goForward && this.props.goForward()
  }
  handleSetViewMode () {
    const viewMode = this.props.viewMode == 'viz' ? 'dataset' : 'viz'
    this.props.setViewMode(viewMode)
  }

  template (css) {
    const { layout, location, sessionProfile, viewMode } = this.props

    if (!sessionProfile) {
      return <div />
    }

    return (
      <div className={css('topbar')} style={layout}>
        <div className={css('nav')}>
          <a className={`icon ${css('nav_button')}`} onClick={this.handleGoBack}>previous</a>
          <a className={`icon ${css('nav_button')}`} onClick={this.handleGoForward}>next</a>
        </div>
        <div className={css('options')}>
          <ViewModeButton onClick={this.handleSetViewMode} mode={viewMode} />
        </div>
        <SearchBar onChange={() => {}} location={location.pathname} />
      </div>
    )
  }

  styles () {
    const palette = defaultPalette

    return {
      topbar: {
        display: 'flex',
        position: 'absolute',
        overflow: 'hidden',
        background: palette.background,
        zIndex: 100,
        boxShadow: '0 0px 4px rgba(0, 0, 0, 0.5)'
      },
      nav_button: {
        display: 'inline-block',
        textAlign: 'center',
        width: 35,
        height: 40,
        padding: '0 5',
        color: 'black'
      },
      nav: {
        flex: '1 1 80px'
      },
      options: {
        flex: '1 1 80px'
      }
    }
  }
}

TopBar.propTypes = {
  sessionProfile: PropTypes.string,
  setViewMode: PropTypes.func,

  goBack: PropTypes.func,
  goForward: PropTypes.func
}

TopBar.defaultProps = {
}
