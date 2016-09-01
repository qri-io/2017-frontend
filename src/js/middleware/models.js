

export const CREATE_MODEL = 'CREATE_MODEL'
export const UPDATE_MODEL = 'UPDATE_MODEL'
export const CLEAR_NEW_MODEL = 'CLEAR_NEW_MODEL'


export const MODEL_ACTION = Symbol('MODEL ACTION')

export default store => next => action => {
	const modelAction = action[MODEL_ACTION];
	if (typeof modelAction === 'undefined') {
    return next(action)
  }

  const { type, schema, model } = modelAction
  
  if (!type) {

  }
  if (!schema) {

  }
  if (!model) {

  }

	switch (type) {
		case CREATE_MODEL:
			break;
		case UPDATE_MODEL:
			break;
		case CLEAR_NEW_MODEL:
			break;
		default:
			console.warn("unknown model action type: %s", type);
	}

  return 
}