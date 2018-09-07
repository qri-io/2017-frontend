import React from 'react'
import Base from './Base'
import Spinner from './Spinner'

export default class Viz extends Base {
  componentWillMount () {
    const { dataset, vizString, loading } = this.props
    const hash = dataset && dataset.viz && dataset.viz.scriptPath

    if (!vizString && hash && !loading) {
      this.props.loadViz(hash)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dataset, vizString } = nextProps
    const hash = dataset && dataset.viz && dataset.viz.scriptPath

    const { dataset: nextDataset, vizString: nextVizString, loading: nextLoading } = nextProps
    const nextHash = nextDataset && nextDataset.viz && nextDataset.viz.scriptPath

    if (nextHash && ((!nextVizString && !nextLoading) || (vizString !== nextVizString) || (hash !== nextHash))) {
      this.props.loadViz(nextHash)
    }
  }

  template (css) {
    const { vizString, error, loading } = this.props

    if (loading) {
      return <div className={css('wrap')}><Spinner /></div>
    }

    if (vizString) {
      return <div className={css('wrap')}><pre>{vizString}</pre></div>
    }

    if (error) {
      return <div className={css('wrap')}>{error}</div>
    }
    return <p>No viz provided in this dataset</p>
  }

  styles () {
    return {
      wrap: {
        height: '100%'
      }
    }
  }
}

Viz.propTypes = {

}

Viz.defaultProps = {
}
