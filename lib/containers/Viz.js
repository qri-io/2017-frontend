import { connect } from 'react-redux'

import { selectCAFSString, selectCAFSLoading, selectCAFSError } from '../selectors/cafs'
import { loadViz } from '../actions/dataset'
import Viz from '../components/dataset/viz'

const VizContainer = connect(
  (state, ownProps) => {
    const { dataset } = ownProps
    const key = dataset && dataset.viz && dataset.viz.scriptPath
    return Object.assign({}, {
      vizString: key && selectCAFSString(state, key),
      loading: key && selectCAFSLoading(state, key),
      error: key && selectCAFSError(state, key)
    }, state.console, ownProps)
  }, {
    loadViz
  }
)(Viz, 'Viz')

export default VizContainer
