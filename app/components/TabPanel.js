import React, { PropTypes } from 'react'
import Base from './Base'

function panelTrigger (i, fn) {
  return () => {
    fn(i)
  }
}

export default class TabPanel extends Base {
  template (css) {
    const { index, labels = [], components, onSelectPanel } = this.props
    const component = components[index]
    return (
      <div className='wrapper'>
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
        <div className='wrapper'>
          {component}
        </div>
      </div>
    )
  }

  styles () {
    return {
      header: {
        fontWeight: 'bold',
        padding: '15px 20px 0px 0px'
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
        'border-top': '1px solid #000000',
        'margin-top': 0
      }
    }
  }
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  labels: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  onSelectPanel: PropTypes.func.isRequired
}
