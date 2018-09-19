import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class ComponentTable extends Base {
  
  infoString(type, component) {
    switch (type) {
        case 'meta':
            return `${Object.keys(component).length} keys`
        case 'viz':
            return 'html'
        case 'transform':
            return 'starlark'
        case 'structure':
            return 'standard schema'
    }
    return ''
  }

  parseDate (datetime) {
    if (!datetime) {
      return 'no date given'
    }
    const date = new Date(datetime)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  template (css) {
    const { dataset, url, date } = this.props
    const components = ['meta', 'transform', 'viz', 'structure', 'body'].filter((component) => dataset[component])

    return (
      <div className={css('wrap')}>
        <table className={css('table')}>
          <tbody>
              {components.map((key) => {
              const component = dataset[key]
              return (<tr key={key} className={css('row')}>
                  <td>
                  <NavLink to={`${url === '/' ? '' : url}/${key}`} className={css('link')}>{key}</NavLink>
                </td>
                <td>{this.infoString(key,component)}</td>
                <td className={css('date')}>{this.parseDate(date)}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        width: '100%',
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 10,
        // borderRadius: 3,
        // border: '1px solid #ccc',
        overflow: 'hidden'
      },
      table: {
        width: '100%'
      },
      row: {
        padding: '10px 5px'
      },
      link: {
          fontSize: 20
      },
      date: {
          textAlign: 'right'
      }
    }
  }
}

ComponentTable.propTypes = {
  meta: PropTypes.object.isRequired
}

ComponentTable.defaultProps = {
  url: ""
}
