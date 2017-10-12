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
      <div>
        <div className={css('header')}>
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
        <section>
          {component}
        </section>
      </div>
    )
  }

  styles () {
    return {
      header: {
        fontWeight: 'bold',
        padding: '15px 20px'
      },
      tab: {
        textTransform: 'uppercase',
        fontStyle: 'oblique',
        fontWeight: '700',
        margin: '2px 20px 2px 0',
        opacity: '0.25',
        fontSize: 18
      },
      currentTab: {
        opacity: '1'
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
