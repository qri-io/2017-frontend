import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Palette, defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class HistoryItem extends Base {
  template (css) {
    const { data, onSelect, index } = this.props
	  const d = data && data.dataset && data.dataset.timestamp && new Date(data.dataset.timestamp)
	  const path = data && data.path
	  const message = `edit #${index}`

	  if (index) {
		  return (
  <div className='history item' >
    <Link to={{pathname: `/dataset/${path.slice(6, -13)}`}} >
      <b className={css('name')}>{(d && d.toString()) || <i>no timestamp</i>}</b>
      <h3>{message}</h3>
    </Link>
    <p className={css('path')}>{path}</p>
  </div>
		  )
	  } else {
	  	return (
  <div className='history item' >
    <b className={css('name')}>{(d && d.toString()) || <i>no timestamp</i>}</b>
    <h3>Current Dataset</h3>
    <p className={css('path')}>{path}</p>
  </div>

	  	)
	  }
  }

  styles (props) {
    const { palette } = props
    return {
      name: {
        color: palette.b,
        fontFamily: '"source code pro", "courier", "monospace"'
      },
      path: {
        color: palette.path
      }
    }
  }
}

HistoryItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  palette: Palette
}

HistoryItem.defaultProps = {
  palette: defaultPalette
}
