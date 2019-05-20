import { BODY_SUCCESS } from '../constants/body'

export default store => next => action => {
  if (action.type !== BODY_SUCCESS) {
    return next(action)
  }
  const body = action && action.response && action.response.entities && action.response.entities.body
  const keys = body && Object.keys(body)
  const key = keys && keys.length > 0 && keys[0]
  const data = body && key && body[key] && body[key].data
  return next({
    type: BODY_SUCCESS,
    data
  })
}
