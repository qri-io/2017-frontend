import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { relDate } from '../utils/date'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class ComponentTable extends Base {
  infoString (type, component) {
    switch (type) {
      case 'meta':
        return `${Object.keys(component).length} keys`
      case 'viz':
        return 'html format'
      case 'transform':
        return 'starlark format'
      case 'structure':
        return 'standard schema'
    }
    return ''
  }

  template (css) {
    const { dataset, url, date } = this.props
    const components = ['meta', 'transform', 'viz', 'structure', 'body'].filter((component) => dataset[component])

    return (
      <div className={css('wrap')}>
        <h5 className={css('title')}>Dataset Components</h5>
        <div className={css('tableWrap')}>
          <table className={css('table')}>
            <tbody>
              {components.map((key) => {
                const component = dataset[key]
                return (<tr key={key} className={css('row')}>
                  <td className={css('name')}>
                    <NavLink to={`${url === '/' ? '' : url}/${key}`} className={css('link')}>{key}</NavLink>
                  </td>
                  <td className={css('info')}>{this.infoString(key, component)}</td>
                  <td className={css('date')}>{relDate(date)}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        width: '100%'
      },
      tableWrap: {
        marginTop: 10,
        borderRadius: 3,
        border: '1px solid #eee',
        overflow: 'hidden'
      },
      table: {
        width: '100%'
      },
      row: {
        borderBottom: '1px solid #eee'
      },
      name: {
        padding: '8px 5px'
      },
      link: {
        fontSize: 17
      },
      info: {
        color: palette.neutralMuted
      },
      date: {
        textAlign: 'right',
        color: palette.neutralMuted,
        paddingRight: 15
      }
    }
  }
}

ComponentTable.propTypes = {
  dataset: PropTypes.object.isRequired
}

ComponentTable.defaultProps = {
  url: ''
}
