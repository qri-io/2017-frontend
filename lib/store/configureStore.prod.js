/* global __BUILD__ */
import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import history from '../history'
import api from '../middleware/api'
import localModels from '../middleware/localModels'
import caf from '../middleware/caf'
import rootReducer from '../reducers'

function configureStore (preloadedState) {
  const middleware = [routerMiddleware(history), thunk, api, caf, localModels]

  if (__BUILD__.DEBUG_PROD) {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    })
    middleware.push(logger)
  }

  const enhancer = applyMiddleware(...middleware)
  const rootReducerWithRouter = connectRouter(history)(rootReducer)
  return createStore(rootReducerWithRouter, preloadedState, enhancer)
}

export default configureStore
