/* global __BUILD__ */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory, createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'

import api from '../middleware/api'
import localModels from '../middleware/localModels'
import rootReducer from '../reducers'

// TODO - restore when backend is changed to account for '/' route correctly
const history = (__BUILD__.ELECTRON) ? createHashHistory() : createBrowserHistory()

const router = routerMiddleware(history)

function configureStore (preloadedState) {
  const middleware = [thunk, api, localModels, router]

  if (__BUILD__.DEBUG_PROD) {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    })
    middleware.push(logger)
  }

  const enhancer = applyMiddleware(...middleware)

  return createStore(rootReducer, preloadedState, enhancer)
}

export default { configureStore, history }

// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import rootReducer from '../reducers'

// import { routerMiddleware } from 'react-router-redux'
// import { browserHistory } from 'react-router'

// export default function configureStore (preloadedState) {
//   return createStore(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(thunk, api, runQuery, locals, routerMiddleware(browserHistory))
//   )
// }
