import { connect } from 'react-redux'

import { fetchDiff, clearDiff } from '../actions/diff'
import { loadDatasetByName } from '../actions/dataset'

import Compare from '../components/compare/Compare'

const CompareContainer = connect(
  (state, ownProps) => {
    const { match } = ownProps
    let params = state.diff.params

    if (match && match.params && match.params.paths) {
      params = paramsFromPaths(match.params.paths)
    }

    if (params.src && !params.dst) {
      params.dst = params.src
      params.src = ''
    }

    return Object.assign({}, state.diff, { params })
  }, {
    loadDatasetByName,
    fetchDiff,
    clearDiff
  }
)(Compare, 'Compare')

function paramsFromPaths (match = '') {
  const spl = match.split('...')
  if (!spl.length) {
    return { src: '', dst: '', selector: '' }
  }

  const { path, selector } = splitPath(spl[0])
  switch (spl.length) {
    case 2:
      return { src: path, selector, dst: splitPath(spl[1]).path }
    case 3:
      return { src: path, selector, dst: splitPath(spl[1]).path }
    default:
      return { src: path, selector }
  }
}

function splitPath (path) {
  const spl = path.split(':')
  if (spl.length === 2) {
    return {
      path: parsePath(spl[0]),
      selector: spl[1]
    }
  }

  return { path: parsePath(path) }
}

function parsePath (path) {
  if (path === '~1') {
    return ''
  }
  return path
}

export default CompareContainer
