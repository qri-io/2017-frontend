import { normalize } from 'normalizr'

export const NEW_MODEL = 'NEW_MODEL'
export const UPDATE_MODEL = 'UPDATE_MODEL'
export const EDIT_MODEL = 'EDIT_MODEL'
export const CLEAR_NEW_MODEL = 'CLEAR_NEW_MODEL'


export const MODEL_ACTION = Symbol('MODEL ACTION')

export default store => next => action => {
	const modelAction = action[MODEL_ACTION];
	if (typeof modelAction === 'undefined') {
    return next(action)
  }

  const { method, type, schema, attributes } = modelAction

  if (!method) {
  	console.warn("model action is missing method. type: %s. schema: %s, attributes:", type, schema.getKey(), attributes);
  }  
  if (!type) {
  	// TODO - warnings
  	console.warn("model action is missing method. type: %s. schema: %s, attributes:", type, schema.getKey(), attributes);
  }
  if (!schema) {
  	// TODO - warnings
  }
  if (!attributes) {
  	// TODO - warnings

  }

  function actionWith(data) {
  	const finalAction = Object.assign({}, action, { type }, data)
    delete finalAction[MODEL_ACTION]
    return finalAction
  }

	switch (method) {
		case NEW_MODEL:
			const model = schema.new(attributes)
			return next(actionWith({ models: normalize(model, schema) }))
		case UPDATE_MODEL:
			return next(actionWith({ models: normalize(attributes, schema) }))
    case EDIT_MODEL:
      // TODO - need an action that moves a model from entities to models
      // return next(actionWith({ models : }))
		case CLEAR_NEW_MODEL:
			// TODO
			// return next(actionWith({ models: { schema.getKey() : { schema.getId(attributes) : undefined }}}))
			break;
		default:
			console.warn("unknown model action method: %s", method);
	}

  return 
}