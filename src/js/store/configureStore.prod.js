import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import locals from '../middleware/locals'
import globalDatasets from '../middleware/globalDatasets'
import rootReducer from '../reducers'

import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
  	applyMiddleware(thunk, api, locals, globalDatasets, routerMiddleware(browserHistory))
  )
}