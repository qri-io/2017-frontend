/* globals __BUILD__ */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import SearchBar from './form/SearchBar'
import ViewModeButton from './form/ViewModeButton'
import Base from './Base'

export default class TopBar extends Base {
  constructor (props) {
    super(props);

    [
      'handleGoBack',
      'handleGoForward',
      'handleSetViewMode',
      'handleSearch',
      'handleChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleGoBack () {
    this.props.history && this.props.history.goBack()
    // this.props.goBack && this.props.goBack()
  }
  handleGoForward () {
    this.props.history && this.props.history.goForward()
  }
  handleSetViewMode () {
    const viewMode = this.props.viewMode === 'viz' ? 'dataset' : 'viz'
    this.props.setViewMode(viewMode)
  }

  handleSearch (e) {
    if (e.key === 'Enter') {
      const { searchString } = this.props

      if (searchString.indexOf('/') === 0 && searchString.indexOf(' ') < 0) {
        this.props.history.push(searchString)
        return
      }
      this.props.history.push({
        pathname: '/search',
        search: searchString ? '?q=' + searchString : ''
      })
    }
  }

  handleChange (e) {
    this.props.setSearch(e.target.value)
    if (e.target.value.indexOf('/') !== 0) { this.props.runDatasetSearch(e.target.value) }
  }

  template (css) {
    const { layout, location, sessionProfile, viewMode, searchString } = this.props

    if (!sessionProfile) {
      return <div />
    }

    return (
      <div className={css('topbar')} style={layout}>
        {__BUILD__.ELECTRON && <div className={css('title_bar')}><p className={css('title')}>qri</p></div>}
        <div className={css('chrome')}>
          <div className={css('nav')}>
            <a className={css('nav_button')} onClick={this.handleGoBack}>previous</a>
            <a className={css('nav_button')} onClick={this.handleGoForward}>next</a>
            <span style={{ marginRight: 8, height: '100%' }} />
            <Link className={css('nav_button')} to='/datasets'>layers</Link>
            <Link className={css('nav_button')} to='/profile'>user</Link>
            <Link className={css('nav_button')} to='/profiles'>usergroup</Link>
          </div>
          <SearchBar onKeyUp={this.handleSearch} searchString={searchString} location={location.pathname} onChange={this.handleChange} />
          <div className={css('options')}>
            <ViewModeButton active={location.pathname.indexOf('/at/') > 0} onClick={this.handleSetViewMode} mode={viewMode} />
          </div>
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette

    return {
      topbar: {
        position: 'absolute',
        overflow: 'hidden',
        background: palette.background,
        zIndex: 100,
        boxShadow: '0 0px 4px rgba(0, 0, 0, 0.5)',
        '-webkit-app-region': 'drag'
      },
      title_bar: {
        textAlign: 'center',
        width: '100%',
        height: 21
      },
      title: {
        color: palette.neutralMuted,
        fontWeight: '500',
        marginTop: 4
      },
      chrome: {
        display: 'flex'
      },
      nav_button: {
        fontFamily: 'SSPika',
        display: 'inline-block',
        textAlign: 'center',
        width: 35,
        height: 40,
        margin: '10px auto',
        padding: '5px 0',
        color: palette.text
      },
      nav: {
        flex: '1 1 240px',
        userSelect: 'none'
      },
      options: {
        flex: '1 2 240px',
        userSelect: 'none'
      }
    }
  }
}

TopBar.propTypes = {
  sessionProfile: PropTypes.string,
  setViewMode: PropTypes.func,
  history: PropTypes.object
}

TopBar.defaultProps = {
}
