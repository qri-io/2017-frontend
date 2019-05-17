import {
  CLEAR_BODY,
  BODY_REQUEST,
  BODY_SUCCESS,
  BODY_FAILURE
} from '../constants/body'

import cloneDeep from 'clone-deep'

export const initialState = {
  id: '',
  selector: '',
  pageSize: 100,
  fetchedAll: false,
  loading: true,
  data: undefined,
  error: ''
}

export default function bodyPaginationReducer (state = initialState, action) {
  switch (action.type) {
    case CLEAR_BODY:
      return initialState
    case BODY_REQUEST:
      if (action.bodypath !== state.id || action.selector !== state.selector) {
        return Object.assign({}, initialState, { id: action.bodypath, selector: action.selector, pageSize: action.pageSize })
      }
      return Object.assign({}, state, { pageSize: action.pageSize, loading: true })
    case BODY_SUCCESS:
      var fetchedAll = state.fetchedAll
      const newData = action.data
      var length = Object.keys(newData).length
      if (state.pageSize === -1 || length < state.pageSize) {
        fetchedAll = true
      }
      var data = cloneDeep(state.data)
      if (!data) { data = Array.isArray(newData) ? [] : {} }

      // assumes that newData will be the same type as data
      if (Array.isArray(data)) {
        data.push(...newData)
      } else {
        data = Object.assign(data, newData)
      }
      return Object.assign({}, state,
        { data, loading: false, fetchedAll })
    case BODY_FAILURE:
      return Object.assign({}, state,
        { loading: false, error: action.error })
    default:
      return state
  }
}
