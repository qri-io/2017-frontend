import React, { PropTypes } from 'react'
import Base from './Base'

import { Palette, defaultPalette } from '../propTypes/palette'

function panelTrigger (i, fn) {
  return () => {
    fn(i)
  }
}

export default class TabPanel extends Base {
  template (css) {
    const { index, labels = [], components, onSelectPanel, bounds } = this.props
    const component = components[index]
    return (
      <div className={css('wrapper')} style={{height: `${bounds.height}px`}}>
        <div className={`${css('header')}`}>
          {labels.map((label, i) => {
            return (
              <a
                key={i}
                className={css('tab', i === index && 'currentTab')}
                onClick={panelTrigger(i, onSelectPanel)}>{label}</a>
            )
          }
          )}
        </div>
        <hr className={css('black')} />
        <div className={css('componentWrapper')} style={{height: `${bounds.height - 59}px`}}>
          {component}
        </div>
      </div>
    )
  }

  styles () {
    const { palette } = this.props
    return {
      header: {
        fontWeight: 'bold',
        padding: '15px 20px 0px 0px',
        height: '42px'
      },
      tab: {
        //  textTransform: 'uppercase',
        // fontStyle: 'oblique',
        fontWeight: '700',
        margin: '2px 20px 2px 0',
        opacity: '0.25',
        fontSize: 18
      },
      currentTab: {
        opacity: '1',
        // Need to generalize this, ask Brendon
        color: '#89DDFF'
      },
      black: {
        'border-top': `1px solid ${palette.overlay}`,
        'margin-top': 0
      },
      componentWrapper: {
        overflow: 'auto'
      }
    }
  }
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  labels: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  onSelectPanel: PropTypes.func.isRequired,
  bounds: PropTypes.object.isRequired,
  palette: Palette
}

TabPanel.defaultProps = {
  palette: defaultPalette
}
