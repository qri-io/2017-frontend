import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import models from '../middleware/models'
import globalDatasets from '../middleware/globalDatasets'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
  	applyMiddleware(thunk, api, models, globalDatasets)
  )
}