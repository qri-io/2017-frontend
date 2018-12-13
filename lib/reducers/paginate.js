import union from 'lodash/union'
import { CLEAR_PAGINATION, CLEAR_PAGINATION_IDS } from '../constants/app'

const initialState = {}

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey, name }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }
  if (!name) {
    throw new Error('Expected name to have a value')
  }

  const [ requestType, successType, failureType ] = types

  const updatePagination = (state = {
    isFetching: false,
    // nextPageUrl: undefined,
    pageCount: 0,
    fetchedAll: false,
    ids: [],
    error: ''
  }, action) => {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, { isFetching: true })
      case successType:
        return Object.assign({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result.data),
          // nextPageUrl: action.response.nextPageUrl,
          fetchedAll: (action.response.result.data && action.response.result.data.length < action.pageSize),
          pageCount: action.page,
          error: ''
        })
      case failureType:
        return Object.assign({}, state, {
          isFetching: false,
          error: action.error
        })
      default:
        return state
    }
  }

  return (state = initialState, action) => {
    // Update pagination by key
    switch (action.type) {
      case CLEAR_PAGINATION:
        if (action.name === name) {
          return initialState
        }
        return state
      case CLEAR_PAGINATION_IDS:
        if (action.section === name) {
          const newState = Object.assign({}, state)
          newState[action.id].ids = []
          return newState
        }
        return state
      case requestType:
      case successType:
      case failureType:
        if (!action.page) { console.warn('expected page property for a pagainated request', action.type) }
        if (!action.pageSize) { console.warn('expected pageSize property for a pagainated request: ', action.type) }

        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return Object.assign({}, state, {
          [key]: updatePagination(state[key], action)
        })
      default:
        return state
    }
  }
}

export default paginate
