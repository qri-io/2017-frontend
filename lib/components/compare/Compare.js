import React from 'react'
import PropTypes from 'prop-types'
import JsonDiff from './JsonDiff'

class Compare extends React.PureComponent {
  componentDidMount () {
    const { params } = this.props
    if (params.dst) {
      this.props.fetchDiff(this.props.params)
    }
  }
  componentWillUnmount () {
    this.props.clearDiff()
  }

  render () {
    const { params, data, loading } = this.props
    return (
      <div className='compare-wrap'>
        <h1>Compare</h1>
        <div className='compare-paths-wrap'>
          <h4>from:</h4>
          <div className='compare-paths'>{params.src}</div>
        </div>
        <div className='compare-paths-wrap'>
          <h4>to:</h4>
          <div className='compare-paths'>{params.dst}</div>
        </div>
        {params.selector && <div className='compare-paths-wrap'>
          <h4>selector:</h4>
          <div className='compare-paths'>{params.selector}</div>
        </div>}
        <p>{loading && 'loading'}</p>
        {data && <JsonDiff data={data.a} diff={data.diff} />}
      </div>
    )
  }
}

Compare.propTypes = {
  params: PropTypes.object,
  loading: PropTypes.bool,
  data: PropTypes.shape({
    a: PropTypes.any,
    b: PropTypes.any,
    stat: PropTypes.object,
    diff: PropTypes.array
  }),

  fetchDiff: PropTypes.func.isRequired,
  clearDiff: PropTypes.func.isRequired
}

Compare.defaultProps = {
  loading: false,
  diff: []
}

export default Compare
