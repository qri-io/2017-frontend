import React from 'react'
import Base from '../Base'
import Spinner from '../chrome/Spinner'
import CodeViewer from '../CodeViewer'

export default class Transform extends Base {
  componentDidMount () {
    const { dataset, transformString, loading } = this.props
    const key = dataset && dataset.transform && dataset.transform.scriptPath

    if (!transformString && key && !loading) {
      this.props.loadTransform(key)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dataset, transformString } = nextProps
    const key = dataset && dataset.transform && dataset.transform.scriptPath

    const { dataset: nextDataset, transformString: nextTransformString, loading: nextLoading } = nextProps
    const nextKey = nextDataset && nextDataset.transform && nextDataset.transform.scriptPath

    if (nextKey && ((!nextTransformString && !nextLoading) || (transformString !== nextTransformString) || (key !== nextKey))) {
      this.props.loadTransform(nextKey)
    }
  }

  template (css) {
    const { transformString, error, loading } = this.props

    if (loading) {
      return <div className='datasetContent' style={{ margin: 20 }}><Spinner large /></div>
    }

    if (transformString) {
      return <CodeViewer code={transformString} />
    }

    if (error) {
      return <div className={css('wrap')}>{error}</div>
    }
    return <div className='datasetContent' style={{ margin: 20 }}><p>No transform provided in this dataset</p></div>
  }

  styles () {
    return {
      wrap: {
        height: '100%'
      }
    }
  }
}

Transform.propTypes = {

}

Transform.defaultProps = {
}
