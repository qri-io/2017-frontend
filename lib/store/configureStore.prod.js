/* global __BUILD__ */
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import history from '../history'
import api from '../middleware/api'
import localModels from '../middleware/localModels'
import caf from '../middleware/caf'
import createRootReducer from '../reducers'
import extractBody from '../middleware/extractBody'

function configureStore (preloadedState) {
  const middleware = [routerMiddleware(history), thunk, api, extractBody, caf, localModels]

  if (__BUILD__.DEBUG_PROD) {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    })
    middleware.push(logger)
  }

  const enhancer = applyMiddleware(...middleware)
  const rootReducerWithRouter = createRootReducer(history)
  return createStore(rootReducerWithRouter, preloadedState, enhancer)
}

export default configureStore
