/* globals __BUILD__ */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { defaultPalette } from '../../propTypes/palette'

import SearchBar from '../form/SearchBar'
import ProfilePhoto from '../profile/ProfilePhoto'
import Base from '../Base'
import ExternalLink from '../ExternalLink.APP_TARGET'

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

  componentDidMount () {
    if (this.props.location) {
      this.props.setLocationBarText(this.props.location.pathname)
    }
  }

  componentDidUpdate (prevProps) {
    const location = this.props && this.props.location
    const prevLocation = prevProps && prevProps.location
    if (prevLocation.pathname !== location.pathname && location.pathname !== '/search') {
      this.props.setLocationBarText(location.pathname)
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
        pathname: '/search',
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
    const { layout, sessionProfile, searchString, profile, location } = this.props
    const current = (path) => {
      return (path === location.pathname) ? 'current' : ''
    }

    return (
      <div className={css('topbar')} style={layout}>
        {__BUILD__.ELECTRON && <div className={css('titlebar')}>
          <p>qri</p>
        </div>}
        <div className={css('no_shrink')}>
          {__BUILD__.ELECTRON && <div className={css('item_spacing')}>
            <a className={css('nav_button', 'first_item')} onClick={this.handleGoBack}>left</a>
            <a className={css('nav_button')} onClick={this.handleGoForward}>right</a>
          </div>}
          {sessionProfile && <Link className={css('nav_button', 'item_spacing', current('/collection'))} to='/collection'>layers</Link>}
          <Link className={css('nav_button', 'item_spacing', current('/network'))} to='/network'>usergroup</Link>
          {sessionProfile &&
          <Link className={css('nav_button', 'item_spacing', current('/edit'))} to='/edit'>edit</Link>}
        </div>
        <SearchBar onKeyUp={this.handleSearch} searchString={searchString} onChange={this.handleChange} />
        <div className={css('help')}>
          <ExternalLink href='https://discord.gg/etap8Gb' className={css('nav_button', 'item_spacing')} target='_blank'>chat</ExternalLink>
          <ExternalLink href='https://qri.io/docs' className={css('nav_button', 'item_spacing')} target='_blank'>help</ExternalLink>
          {sessionProfile && <Link className={css('nav_button', 'item_spacing')} to='/profile'><ProfilePhoto profile={profile} size='sm' /></Link>}
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
        boxShadow: '0 0px 4px rgba(0, 0, 0, 0.35)',
        '-webkit-app-region': 'drag',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      titlebar: {
        flex: '1 0 100%',
        width: '100%',
        height: 20,
        textAlign: 'center'
      },
      first_item: {
        marginRight: 10,
        marginLeft: 0
      },
      item_spacing: {
        marginRight: 30,
        display: 'inline-block'
      },
      no_shrink: {
        flex: '1 0',
        alignItems: 'baseline',
        padding: '11px 0 0 20px'
      },
      help: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
        flex: '1 1'
      },
      current: {
        color: palette.primary
      },
      nav_button: {
        fontFamily: 'SSPika',
        display: 'inline-block',
        textAlign: 'center',
        width: 22,
        height: 30,
        fontSize: 19,
        color: palette.text
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
