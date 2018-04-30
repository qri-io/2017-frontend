import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'

import { defaultPalette } from '../propTypes/palette'
import Search from './Search'

export default class TabPanel extends Base {
  constructor (props) {
    super(props)

    this.state = {
      index: 0,
      searchString: ''
    };

    [
      'handleSetPanel',
      'setSearch',
      'renderSearch'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleSetPanel (i, onSelectPanel, e) {
    if (typeof onSelectPanel === 'function') {
      onSelectPanel(i)
    } else {
      this.setState({ index: i })
    }
  }

  setSearch (searchString) {
    this.setState({searchString})
  }

  renderSearch (css) {
    return (
      <div className={css('search')}>
        <Search searchString={this.state.searchString} onChange={this.setSearch} placeholder='search data' />
      </div>
    )
  }

  template (css) {
    const { index, expanded, labels = [], components, onSelectPanel, onToggleExpand, search, clearBackground } = this.props
    const panel = (index !== undefined) ? index : this.state.index
    const component = components[panel]
    const cssWrap = clearBackground ? css('wrap') : css('wrap', 'background')
    return (
      <div className={cssWrap} >
        <header className={`${css('header')}`}>
          { onToggleExpand && <a className={`icon ${css('expand')}`} onClick={onToggleExpand}>{expanded ? 'contract' : 'expand'}</a> }
          {labels.map((label, i) => {
            return (
              <a
                key={i}
                className={css('tab', i === panel && 'currentTab')}
                onClick={this.handleSetPanel.bind(this, i, onSelectPanel)}><h5>{label}</h5></a>
            )
          }
          )}
        </header>
        {search ? this.renderSearch(css) : undefined}
        <div className={css('content')}>
          {component}
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      background: {
        background: palette.sink
      },
      wrap: {
        height: '100%',
        maxHeight: 600,
        overflow: 'hidden',
        borderRadius: 3,
        display: 'flex',
        flexFlow: 'column nowrap'
      },
      search: {
        height: 45,
        paddingLeft: 12
      },
      tab: {
        display: 'inline-block',
        color: palette.neutral,
        transition: 'all 0.25s',
        marginRight: 40
      },
      expand: {
        float: 'right',
        cursor: 'pointer',
        maxHeight: '100%',
        color: palette.neutralBold,
        marginRight: 5,
        marginTop: 0
      },
      currentTab: {
        color: palette.a
      },
      header: {
        marginLeft: 12,
        marginRight: 10,
        fontWeight: 'bold',
        padding: '12px 0 0 0',
        flex: '1 1 50px'
      },
      content: {
        flex: '2 1 90%',
        overflow: 'auto',
        display: 'flex'
      }
    }
  }
}

TabPanel.propTypes = {
  labels: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  index: PropTypes.number,
  onSelectPanel: PropTypes.func,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  clearBackground: PropTypes.bool
}

TabPanel.defaultProps = {
}
