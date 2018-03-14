/* global __BUILD__ */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory, createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'

import api from '../middleware/api'
import locals from '../middleware/locals'
import rootReducer from '../reducers'

// const history = (__BUILD__.ELECTRON)
//   ? createHashHistory()
//   : createBrowserHistory()

const history = createHashHistory()

const router = routerMiddleware(history)

function configureStore (preloadedState) {
  const middleware = [thunk, api, locals, router]

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
