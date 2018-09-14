import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import Routes from '../routes'
import history from '../history'

export default function Root ({ store }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}
