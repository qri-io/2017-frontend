import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'

import { Palette, defaultPalette } from '../propTypes/palette'

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
    const { index, expanded, labels = [], components, onSelectPanel, onToggleExpand } = this.props
    const panel = (index !== undefined) ? index : this.state.index
    const component = components[panel]
    return (
      <div className={css('wrap')} >
        <header className={`${css('header')}`}>
          { onToggleExpand && <a className={`icon ${css('expand')}`} onClick={onToggleExpand}>{expanded ? 'contract' : 'expand'}</a> }
          {labels.map((label, i) => {
            return (
              <a
                key={i}
                className={css('tab', i === panel && 'currentTab')}
                onClick={this.handleSetPanel.bind(this, i, onSelectPanel)}>{label}</a>
            )
          }
          )}
        </header>
        <div>
          {component}
        </div>
      </div>
    )
  }

  styles () {
    const { palette } = this.props
    return {
      wrap: {
        margin: 10,
        background: palette.sink,
        borderRadius: 3
      },
      header: {
        marginLeft: 10,
        marginRight: 10,
        fontWeight: 'bold',
        padding: '15px 0 0 0',
        minHeight: 50
      },
      tab: {
        fontWeight: '700',
        margin: '2px 20px 2px 0',
        opacity: '0.25',
        transition: 'all 0.25s',
        fontSize: 18
      },
      expand: {
        float: 'right',
        cursor: 'pointer',
        color: palette.muted,
        marginRight: 5,
        marginTop: 0
      },
      currentTab: {
        opacity: '1',
        color: palette.a
      },
      black: {
        'border-top': `1px solid ${palette.overlay}`,
        'margin-top': 0
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
  palette: Palette
}

TabPanel.defaultProps = {
  palette: defaultPalette
}
