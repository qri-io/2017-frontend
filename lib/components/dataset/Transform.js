import React from 'react'
import Base from '../Base'
import Spinner from '../chrome/Spinner'
import CodeViewer from '../CodeViewer'

export default class Transform extends Base {
  componentWillMount () {
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
      return <div className={css('wrap')}><Spinner /></div>
    }

    if (transformString) {
      return <CodeViewer code={transformString} />
    }

    if (error) {
      return <div className={css('wrap')}>{error}</div>
    }
    return <p>No transform provided in this dataset</p>
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
