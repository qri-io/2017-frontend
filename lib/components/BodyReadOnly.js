import React from 'react'
import Base from './Base'

export default class BodyReadOnly extends Base {
  template (css) {
    return (
      <div className={css('readOnly')}>
        <p>The dataset body can only be viewed by downloading Qri</p>
        <p><a href='https://github.com/qri-io/qri/releases'>Download and set up your own Qri server!</a></p>
      </div>
    )
  }
  styles () {
    return {
      readOnly: {
        fontFamily: 'monospace',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
      }
    }
  }
}

BodyReadOnly.propTypes = {
}

BodyReadOnly.defaultProps = {
}
