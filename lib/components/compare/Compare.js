import React from 'react'
import PropTypes from 'prop-types'
import Json from '../Json'
import JsonDiff from './JsonDiff'

class Compare extends React.PureComponent {
  componentDidMount () {
    this.props.fetchDiff({ src: 'b5/awesome_csv', dst: '', selector: '' })
  }

  render () {
    const { src, dst, params, diff, diffStat, loading } = this.props
    return (
      <div className='wrap'>
        <h1>Compare</h1>
        <h4>from: {params.src} to: {params.dst}</h4>
        <p>{loading && 'loading'}</p>
        {/* {diffStat && <Json body={diffStat} />} */}
        {src && <JsonDiff data={src} diff={diff} />}
      </div>
    )
  }
}

Compare.propTypes = {
  params: PropTypes.object,
  loading: PropTypes.bool,

  src: PropTypes.any,
  dst: PropTypes.any,

  diff: PropTypes.array,
  diffStat: PropTypes.object,

  fetchDiff: PropTypes.func,
  loadDataset: PropTypes.func
}

Compare.defaultProps = {
  loading: false,
  diff: []
}

export default Compare
