import React from 'react'
import PropTypes from 'prop-types'

import Base from './Base'

export default class CodeViewer extends Base {
  template (css) {
    const { code } = this.props
    return (
      <div className={css('wrap')}>
        <pre className={css('lineCount')}>{code.split('\n').map((_, i) => <p className={css('line')} key={i}>{i + 1}</p>)}</pre>
        <pre className={css('code')}>{code}</pre>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        width: '100%',
        margin: '0 0 30px 0',
        padding: '10px 0 0 0',
        borderRadius: 3,
        border: '1px solid #eee',
        overflow: 'hidden',
        position: 'relative'
      },
      lineCount: {
        position: 'absolute',
        overflow: 'hidden',
        height: '100%',
        width: 40,
        fontSize: 14,
        padding: '0 5px 20px 0',
        textAlign: 'right',
        borderRight: '1px solid #eee'
      },
      line: {
        padding: 0,
        margin: 0
      },
      code: {
        fontSize: 14,
        padding: '0 20px 20px 55px',
        overflow: 'auto'
      }
    }
  }
}

CodeViewer.propTypes = {
  code: PropTypes.string.isRequired
}

CodeViewer.defaultProps = {
  url: ''
}
