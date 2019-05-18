import { GET_DIFF } from '../middleware/diff'

import {
  DIFF_REQUEST,
  DIFF_SUCCESS,
  DIFF_FAILURE
} from '../constants/diff'

export function fetchDiff (params) {
  return {
    [GET_DIFF]: {
      types: [DIFF_REQUEST, DIFF_SUCCESS, DIFF_FAILURE],
      params
    }
  }
}
