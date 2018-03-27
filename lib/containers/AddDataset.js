import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { initDataset, loadDatasets } from '../actions/dataset'
import { selectSessionProfile } from '../selectors/session'
import AddDataset from '../components/AddDataset'

const AddDatasetContainer = connect(
  (state, ownProps) => {
    return Object.assign({}, {
      history: ownProps.history,
      goBack: ownProps.history.goBack,
      id: selectSessionProfile(state)
    }, state.console, ownProps)
  }, {
    initDataset,
    loadDatasets,
    push
  }
)(AddDataset)

export default AddDatasetContainer
