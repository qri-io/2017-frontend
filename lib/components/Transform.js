import React from 'react'
import Base from './Base'
import Spinner from './Spinner'

export default class Transform extends Base {
  componentWillMount () {
    const { dataset, transformString, loading } = this.props
    const hash = dataset && dataset.transform && dataset.transform.scriptPath

    if (!transformString && hash && !loading) {
      this.props.loadTransform(hash)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dataset, transformString } = nextProps
    const hash = dataset && dataset.transform && dataset.transform.scriptPath

    const { dataset: nextDataset, transformString: nextTransformString, loading: nextLoading } = nextProps
    const nextHash = nextDataset && nextDataset.transform && nextDataset.transform.scriptPath

    if (nextHash && ((!nextTransformString && !nextLoading) || (transformString !== nextTransformString) || (hash !== nextHash))) {
      this.props.loadTransform(nextHash)
    }
  }

  template (css) {
    const { transformString, error, loading } = this.props

    if (loading) {
      return <div className={css('wrap')}><Spinner /></div>
    }

    if (transformString) {
      return <div className={css('wrap')}><pre>{transformString}</pre></div>
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
