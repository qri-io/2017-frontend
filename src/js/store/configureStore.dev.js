import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../middleware/api'
import locals from '../middleware/locals'
import globalDatasets from '../middleware/globalDatasets'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, locals, globalDatasets, routerMiddleware(browserHistory)/*, createLogger()*/),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}