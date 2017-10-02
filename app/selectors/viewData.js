// TODO

/* eslint-disable */

/* viewFunctions are higher-order functions that transform results
 * Results will always be an object in the following shape:
 * results = {
 *     meta: {},
 *     schema : [{ name : "", }],
 *     data   : [
 *       [...row...],
 *       [...row...],
 *     ]
 * }
 *
 *
 */

const _results = {
  meta: {},
  schema: [],
  data: []
}

// an example view model
const _view = {
  type: 'column_chart',
  config: {},
  series: [
    { name: '',
      color: '',
      funcs: [
        ['column_tally', 'col_name']
      ]
    }
  ]
}

//
// key-value functions
//

/* returns the values of a column, with col_name set as the key
 *
 */
function column (data = [], series = {}, results = _result, col_name = '') {
  // TODO idx is assigned but never used, consider depreciation
  // const idx = colIndex(results, col_name)
  return results.data.map((row) => {
    return { name: col_name, [series.name]: row[col_name] }
  })
}

/* tally counts all the occurences of each value in a column
 */
function column_tally (data = [], series = {}, results = _result, col_name = '') {
  const idx = colIndex(results, col_name)
  // console.log(data, results, col_name, idx);

  const keys = data.reduce((k, row) => {
    k[row[idx]] || (k[row[idx]] = 0)
    k[row[idx]]++
    return k
  }, {})

  return Object.keys(keys).map((key) => {
    return { name: key, [series.name]: keys[key] }
  })
}

/* */
function round (data = [], series = {}, results = _result) {
  return data.map(d => {
    d[series.name] = Math.round(d[series.name])
    return d
  })
}

function sum (data = [], series = {}, results = _result) {
  return [Object.assign({
    [series.name]: data.length
  }, data[0])]
}

//
// general row funcs
//
function sum_rows (data = [], series = {}, results = _result) {
  return [Object.assign({
    [series.name]: results.data.length
  }, data[0])]
}

//
// single-value functions
//

function max_value (data = [], series = {}, results = _result, col_name = '') {
  const idx = colIndex(results, col_name)
  return [Object.assign({
    [series.name]: Math.max(...data.map((row) => row[idx]))
  }, data[0])]
}

function min_value (data = [], series = {}, results = _result, col_name = '') {
  const idx = colIndex(results, col_name)
  return [Object.assign({
    [series.name]: Math.min(...data.map((row) => row[idx]))
  }, data[0])]
}

function sum_value (data = [], series = {}, results = _result, col_name = '') {
  const idx = colIndex(results, col_name)
  return [Object.assign({
    [series.name]: data.reduce((t, row) => t + row[idx], 0)
  }, data[0])]
}

function avg_value (data = [], series = {}, results = _result, col_name = '') {
  const idx = colIndex(results, col_name)
  return [Object.assign({
    [series.name]: (data.reduce((t, row) => t + row[idx], 0) / data.length)
  }, data[0])]
}

//
// utils
//

function colIndex (results = _result, col_name = '') {
  return results.schema.findIndex((col) => {
    return (col.name === col_name)
  })
}

// map
const viewFuncs = {
  sum_rows,

  column_tally,
  column,

  round,
  sum,

  max_value,
  min_value,
  sum_value,
  avg_value
}

export default function selectViewData (view = _view, results = _results) {
  return view.series.reduce((data, series, i) => {
    return series.funcs.reduce((data, func, j) => {
      series.name || (series.name = 'series ' + (i + 1))
      return viewFuncs[func[0]].apply(this, [data, series, results].concat(func.slice(1, func.length)))
    }, data)
  }, results.data.slice(0, results.data.length))
}
/* eslint-enable */
