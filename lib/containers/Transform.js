import { connect } from 'react-redux'

import { selectCAFSString, selectCAFSLoading, selectCAFSError } from '../selectors/cafs'
import { loadTransform } from '../actions/dataset'
import Transform from '../components/dataset/Transform'

const TransformContainer = connect(
  (state, ownProps) => {
    const { dataset } = ownProps
    const key = dataset && dataset.transform && dataset.transform.scriptPath
    return Object.assign({}, {
      transformString: key && selectCAFSString(state, key),
      loading: key && selectCAFSLoading(state, key),
      error: key && selectCAFSError(state, key)
    }, state.console, ownProps)
  }, {
    loadTransform
  }
)(Transform, 'Transform')

export default TransformContainer
