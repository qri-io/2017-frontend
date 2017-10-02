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
