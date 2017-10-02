import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import api from '../middleware/api'
import runQuery from '../middleware/runQuery'
import locals from '../middleware/locals'
import rootReducer from '../reducers'

const history = createBrowserHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, api, runQuery, locals, router)

function configureStore (preloadedState) {
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
