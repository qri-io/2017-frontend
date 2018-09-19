import React from 'react'
import PropTypes from 'prop-types'
import Hash from './Hash'

import { defaultPalette } from '../propTypes/palette'

import Base from './Base'

export default class MetaTable extends Base {
  constructor (props) {
    super(props);
    [].forEach((m) => { this[m] = this[m].bind(this) })
  }

  template (css) {
    const { meta } = this.props

    return (
      <div className={css('wrap')}>
        <table className={css('meta')}>
          <thead>
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(meta).map((key) => {
              return (<tr key={key}>
                <td>{key}</td><td>{JSON.stringify(meta[key])}</td>
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
        display: 'flex',
        width: '100%',
        marginTop: 10,
        paddingTop: 12,
        paddingBottom: 10,
        borderRadius: 3
      },
      left: {
        flex: '1 1 80px'
      },
      right: {
        marginRight: 15,
        flex: '2 1 80px',
        textAlign: 'right',
        color: palette.neutralBold
      },
      extraSpace: {
        marginRight: 50
      },
      muted: {
        color: palette.neutralBold
      },
      open: {
        color: palette.c
      }
    }
  }
}

MetaTable.propTypes = {
  meta: PropTypes.object.isRequired
}

MetaTable.defaultProps = {
  style: {},
  stats: [],
  muted: false,
  extraSpace: false,
  large: false
}
