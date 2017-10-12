import { normalize } from 'normalizr'

export const NEW_MODEL = 'NEW_MODEL'
export const UPDATE_MODEL = 'UPDATE_MODEL'
export const EDIT_MODEL = 'EDIT_MODEL'
export const CLEAR_MODEL = 'CLEAR_MODEL'

export const LOCAL_ACTION = Symbol('LOCAL MODEL ACTION')

export default store => next => action => {
  const modelAction = action[LOCAL_ACTION]
  if (typeof modelAction === 'undefined') {
    return next(action)
  }

  const { method, type, schema, attributes } = modelAction

  if (!method) {
    console.warn('model action is missing method. type: %s. schema: %s, attributes:', type, schema.getKey(), attributes)
  }
  if (!type) {
    // TODO - warnings
    console.warn('model action is missing method. type: %s. schema: %s, attributes:', type, schema.getKey(), attributes)
  }
  if (!schema) {
    // TODO - warnings
  }
  if (!attributes) {
    // TODO - warnings
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, { type }, data)
    delete finalAction[LOCAL_ACTION]
    return finalAction
  }

  switch (method) {
    case NEW_MODEL:
      const model = schema.new(attributes)
      return next(actionWith({ locals: normalize(model, schema) }))
    case UPDATE_MODEL:
      return next(actionWith({ locals: normalize(attributes, schema) }))
    case EDIT_MODEL:
      return next(actionWith({ locals: normalize(attributes, schema) }))
    case CLEAR_MODEL:
    // TODO
    // return next(actionWith({ locals: { schema.getKey() : { schema.getId(attributes) : undefined }}}))
      break
    default:
      console.warn('unknown model action method: %s', method)
  }
}
