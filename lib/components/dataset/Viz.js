import React from 'react'

import Spinner from '../chrome/Spinner'
import CodeViewer from '../CodeViewer'

export default class Viz extends React.PureComponent {
  componentDidMount () {
    const { dataset, vizString, loading } = this.props
    const key = dataset && dataset.viz && dataset.viz.scriptPath

    if (!vizString && key && !loading) {
      this.props.loadViz(key)
    }
  }

  componentDidUpdate (prevProps) {
    const prevDataset = prevProps && prevProps.dataset
    const prevKey = prevDataset && prevDataset.viz && prevDataset.viz.scriptPath

    const { dataset, loading } = this.props
    const key = dataset && dataset.viz && dataset.viz.scriptPath

    if (!loading && prevKey !== key) {
      this.props.loadTransform(key)
    }
  }

  render () {
    const { vizString, error, loading } = this.props

    if (loading) {
      return <div className='viz-wrap'><Spinner large /></div>
    }

    if (vizString) {
      return <CodeViewer code={vizString} />
    }

    if (error) {
      return <div className='viz-wrap'>{error}</div>
    }
    return <div className='datasetContent' style={{ margin: 20 }}><p>No viz provided in this dataset</p></div>
  }
}

Viz.propTypes = {

}

Viz.defaultProps = {
}
