import {
  DIFF_REQUEST,
  DIFF_SUCCESS,
  DIFF_FAILURE,

  DIFF_CLEAR
} from '../constants/diff'

const initialState = {
  params: {
    src: '',
    dst: '',
    selector: ''
  },

  loading: false,
  error: ''
}

// Creates a reducer managing a diff, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function diff (state = initialState, action) {
  const { type, params, data, error } = action

  switch (type) {
    case DIFF_REQUEST:
      return { params, loading: true }
    case DIFF_SUCCESS:
      return { params, data, loading: false }
    case DIFF_FAILURE:
      return { params, loading: false, error }
    case DIFF_CLEAR:
      return initialState
    default:
      return state
  }
}
