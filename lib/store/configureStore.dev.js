import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import history from '../history'
import api from '../middleware/api'
import localModels from '../middleware/localModels'
import caf from '../middleware/caf'
import rootReducer from '../reducers'

const configureStore = (initialState) => {
  const middleware = [routerMiddleware(history), thunk, api, caf, localModels]
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
  const rootReducerWithRouter = connectRouter(history)(rootReducer)
  const store = createStore(rootReducerWithRouter, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    )
  }

  return store
}

export default configureStore
