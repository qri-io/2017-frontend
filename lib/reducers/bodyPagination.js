import { combineReducers } from 'redux'

import {
  DATASET_BODY_REQUEST,
  DATASET_BODY_SUCCESS,
  DATASET_BODY_FAILURE
} from '../constants/dataset'

export const initialPage = {
  selector: '',
  pageSize: 100,
  fetchedAll: false,
  loading: true,
  error: ''
}

export default function bodyPaginationReducer (state = {}, action) {
  switch (action.type) {
    case DATASET_BODY_REQUEST:
      var page = Object.assign({}, initialPage)
      if (action.bodypath in state) {
        page = state[action.bodypath]
      }
      var selector = action.selector || page.selector
      var pageSize = action.pageSize || page.pageSize
      return Object.assign({}, state,
        {
          [action.bodypath]: Object.assign({}, page,
            { selector, pageSize, loading: true })
        })
    case DATASET_BODY_SUCCESS:
      page = state[action.bodypath]
      var fetchedAll = page.fetchedAll
      const ids = action.response.entities.body[action.bodypath].data
      if (ids.length < page.pageSize) {
        fetchedAll = true
      }
      return Object.assign({}, state,
        {
          [action.bodypath]: Object.assign({}, state[action.bodypath],
            { fetchedAll, loading: false, error: '' })
        })
    case DATASET_BODY_FAILURE:
      return Object.assign({}, state,
        {
          [action.bodypath]: Object.assign({}, state[action.bodypath],
            { loading: false, error: action.error })
        })
    default:
      return state
  }
}
