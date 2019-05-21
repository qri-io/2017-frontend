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
      <div className='wrap'>
        <h1>Compare</h1>
        <h4>from: {params.src} {params.selector} to: {params.dst}</h4>
        <p>{loading && 'loading'}</p>
        {data && <JsonDiff data={data.b} diff={data.diff} />}
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
