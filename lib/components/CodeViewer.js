import React from 'react'
import PropTypes from 'prop-types'

export default class CodeViewer extends React.PureComponent {
  render () {
    const { code } = this.props
    return (
      <div className='code-viewer-wrap'>
        <pre className='code-viewer-line-count'>{code.split('\n').map((_, i) => <p className='code-viewer-line' key={i}>{i + 1}</p>)}</pre>
        <pre className='code-viewer-code'>{code}</pre>
      </div>
    )
  }
}

CodeViewer.propTypes = {
  code: PropTypes.string.isRequired
}

CodeViewer.defaultProps = {
  url: ''
}
