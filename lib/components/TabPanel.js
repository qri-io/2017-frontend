import React from 'react'
import PropTypes from 'prop-types'

// TODO (ramfox): marked for deprecation, we don't use this component for anything anymore
export default class TabPanel extends React.PureComponent {
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

  render () {
    const { index, expanded, labels = [], components, onSelectPanel, onToggleExpand, clearBackground } = this.props
    const panel = (index !== undefined) ? index : this.state.index
    const component = components[panel]
    const cssWrap = clearBackground ? 'tab-panel-wrap' : 'tab-panel-wrap tab-panel-background'
    return (
      <div className={cssWrap} >
        <div className='tab-panel-header'>
          { onToggleExpand && <a className='icon tab-panel-expand' onClick={onToggleExpand}>{expanded ? 'contract' : 'expand'}</a> }
          {labels.map((label, i) => {
            return (
              <a
                key={i}
                className='tab-panel-tab'
                onClick={this.handleSetPanel.bind(this, i, onSelectPanel)}><h4 className={i === panel ? 'tab-panel-current-tab' : ''}>{label}</h4></a>
            )
          }
          )}
        </div>
        <div className={`tab-panel-content ${clearBackground && 'tab-panel-content-sink'}`}>
          {component}
        </div>
      </div>
    )
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
