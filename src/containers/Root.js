import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import Routes from '../routes.dev'

export default function Root ({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}

// /* globals __BUILD__ */
// if (__BUILD__.PRODUCTION) {
//   module.exports = require('./Root.prod')
// } else if (__BUILD__.STAGING) {
//   module.exports = require('./Root.prod')
// } else if (__BUILD__.DEVELOP) {
//   module.exports = require('./Root.dev')
// } else if (__BUILD__.DESKTOP) {
//   module.exports = require('./Root.desktop')
// }
