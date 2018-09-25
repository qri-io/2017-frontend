import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'

import { defaultPalette } from '../propTypes/palette'

export default class TabPanel extends Base {
  constructor (props) {
    super(props)

    this.state = {
      index: 0
    };

    [
      'handleSetPanel'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleSetPanel (i, onSelectPanel, e) {
    if (typeof onSelectPanel === 'function') {
      onSelectPanel(i)
    } else {
      this.setState({ index: i })
    }
  }

  template (css) {
    const { index, expanded, labels = [], components, onSelectPanel, onToggleExpand, clearBackground } = this.props
    const panel = (index !== undefined) ? index : this.state.index
    const component = components[panel]
    const cssWrap = clearBackground ? css('wrap') : css('wrap', 'background')
    return (
      <div className={cssWrap} >
        <div className={`${css('header')}`}>
          { onToggleExpand && <a className={`icon ${css('expand')}`} onClick={onToggleExpand}>{expanded ? 'contract' : 'expand'}</a> }
          {labels.map((label, i) => {
            return (
              <a
                key={i}
                className={css('tab')}
                onClick={this.handleSetPanel.bind(this, i, onSelectPanel)}><h4 className={css('tabh4', i === panel && 'currentTab')}>{label}</h4></a>
            )
          }
          )}
        </div>
        <div className={`${css('content')} ${clearBackground ? css('contentSink') : ''}`}>
          {component}
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      background: {
        background: palette.sink,
        padding: 15
      },
      wrap: {
        height: '100%',
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
        transition: 'all 0.25s',
        marginRight: 40
      },
      expand: {
        float: 'right',
        cursor: 'pointer',
        maxHeight: '100%',
        color: palette.neutral,
        marginRight: 5,
        marginTop: 3
      },
      currentTab: {
        color: palette.a
      },
      header: {
        fontWeight: 'bold',
        background: palette.background
      },
      content: {
        display: 'flex',
        height: '100%'
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
