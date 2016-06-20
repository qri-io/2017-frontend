import { DATASETS_SUCCESS } from '../actions/dataset'

// A Redux middleware that looks for any action that affects the local listing of datasets
// and updates the array at window.datasets to match. this is then used by ace's built-in
// autocompleter
export default store => next => action => {
  if (action.type == DATASETS_SUCCESS) {
  	const datasets = action.response.entities.datasets
  	// TODO - sync / reduce already existing datasets
    window.datasets = Object.keys(datasets).map(key => datasets[key])
  }

  return next(action);
}