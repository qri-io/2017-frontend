import React from 'react'
import Base from './Base'
import Spinner from './Spinner'

export default class Viz extends Base {
  componentWillMount () {
    const { dataset, vizString, loading } = this.props
    const key = dataset && dataset.viz && dataset.viz.scriptPath

    if (!vizString && key && !loading) {
      this.props.loadViz(key)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dataset, vizString } = nextProps
    const key = dataset && dataset.viz && dataset.viz.scriptPath

    const { dataset: nextDataset, vizString: nextVizString, loading: nextLoading } = nextProps
    const nextKey = nextDataset && nextDataset.viz && nextDataset.viz.scriptPath

    if (nextKey && ((!nextVizString && !nextLoading) || (vizString !== nextVizString) || (key !== nextKey))) {
      this.props.loadViz(nextKey)
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
