/* globals __BUILD__ */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'

import SearchBar from './form/SearchBar'
import Base from './Base'

export default class TopBar extends Base {
  constructor (props) {
    super(props);

    [
      'handleGoBack',
      'handleGoForward',
      'handleSearch',
      'handleChange'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (this.props.location) {
      this.props.setLocationBarText(this.props.location.pathname)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { location } = this.props
    const { location: nextLocation } = nextProps
    if (location.pathname !== nextLocation.pathname && nextLocation.pathname !== '/search') {
      this.props.setLocationBarText(nextLocation.pathname)
    }
  }

  handleGoBack () {
    this.props.history && this.props.history.goBack()
    // this.props.goBack && this.props.goBack()
  }
  handleGoForward () {
    this.props.history && this.props.history.goForward()
  }

  handleSearch (e) {
    if (e.key === 'Enter') {
      const { searchString } = this.props

      if (searchString.indexOf('/') === 0 && searchString.indexOf(' ') < 0) {
        this.props.history.push(searchString)
        return
      }
      this.props.setSearch(searchString)
      this.props.history.push({
        pathname: '/datasets/search',
        search: searchString ? '?q=' + searchString : ''
      })
    }
  }

  handleChange (e) {
    this.props.setLocationBarText(e.target.value)
    // only run search on 'Enter'
    // if (e.target.value.indexOf('/') !== 0) { this.props.runDatasetSearch(e.target.value) }
  }

  template (css) {
    const { layout, sessionProfile, searchString } = this.props

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
          <SearchBar onKeyUp={this.handleSearch} searchString={searchString} onChange={this.handleChange} />
          <a href='https://qri.io/docs' className={`icon-inline ${css('help')}`} target='_blank'>help</a>
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
        background: palette.sink,
        zIndex: 1,
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
        flex: '1 0 240px',
        userSelect: 'none'
      },
      options: {
        flex: '1 2 240px',
        userSelect: 'none'
      },
      help: {
        flex: '1 0',
        alignSelf: 'center',
        marginBottom: 5,
        marginRight: 10,
        fontSize: 26
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
