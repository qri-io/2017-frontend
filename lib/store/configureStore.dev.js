import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import history from '../history'
import api from '../middleware/api'
import localModels from '../middleware/localModels'
import caf from '../middleware/caf'
import extractBody from '../middleware/extractBody'
import createRootReducer from '../reducers'

const configureStore = (initialState) => {
  const middleware = [routerMiddleware(history), thunk, api, extractBody, caf, localModels]
  const enhancers = []
  const actionCreators = {}

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators
    })
    : compose
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // Create Store
  const rootReducerWithRouter = createRootReducer(history)
  const store = createStore(rootReducerWithRouter, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    )
  }

  return store
}

export default configureStore
