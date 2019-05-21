import { GET_DIFF } from '../middleware/diff'

import {
  DIFF_REQUEST,
  DIFF_SUCCESS,
  DIFF_FAILURE,

  DIFF_CLEAR
} from '../constants/diff'

export function fetchDiff (params) {
  return {
    [GET_DIFF]: {
      types: [DIFF_REQUEST, DIFF_SUCCESS, DIFF_FAILURE],
      params
    }
  }
}

export function clearDiff () {
  return {
    type: DIFF_CLEAR
  }
}
