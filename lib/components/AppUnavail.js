import React from 'react'
import AppDrag from './AppDrag'

export default class AppUnavail extends React.PureComponent {
  render () {
    return (
      <div className='app-unavail-page'>
        <AppDrag />
        <div className='app-unavail-center'>
          <h4>Qri backend is unavailable</h4>
          <p>😭 😭 😭</p>
          <hr />
          <p>If you are running locally try typing</p>
          <p><b>qri connect --disable-webapp</b></p>
          <p>into your terminal to start up your local qri server</p>
        </div>
      </div>
    )
  }
}

AppUnavail.propTypes = {
}

AppUnavail.defaultProps = {
}
