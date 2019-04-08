import React from 'react'

import Spinner from '../chrome/Spinner'
import CodeViewer from '../CodeViewer'

export default class Transform extends React.PureComponent {
  componentDidMount () {
    const { dataset, transformString, loading } = this.props
    const key = dataset && dataset.transform && dataset.transform.scriptPath

    if (!transformString && key && !loading) {
      this.props.loadTransform(key)
    }
  }

  componentDidUpdate (prevProps) {
    const prevDataset = prevProps && prevProps.dataset
    const prevKey = prevDataset && prevDataset.transform && prevDataset.transform.scriptPath

    const { dataset, loading } = this.props
    const key = dataset && dataset.transform && dataset.transform.scriptPath

    if (!loading && prevKey !== key) {
      this.props.loadTransform(key)
    }
  }

  render () {
    const { transformString, error, loading } = this.props

    if (loading) {
      return <div className='datasetContent' style={{ margin: 20 }}><Spinner large /></div>
    }

    if (transformString) {
      return <CodeViewer code={transformString} />
    }

    if (error) {
      return <div className='transform-wrap'>{error}</div>
    }
    return <div className='datasetContent' style={{ margin: 20 }}><p>No transform provided in this dataset</p></div>
  }
}

Transform.propTypes = {

}

Transform.defaultProps = {
}
