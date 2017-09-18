import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import runQuery from '../middleware/runQuery'
import locals from '../middleware/locals'
import rootReducer from '../reducers'

import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export default function configureStore (preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, runQuery, locals, routerMiddleware(browserHistory))
  )
}
