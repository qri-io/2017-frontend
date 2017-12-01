
const setWeights = (avg, mode = undefined, max = undefined) => {
  if (!(avg >= 0) || !(mode === undefined || mode >= 0) || !(max === undefined || max >= 0)) {
    console.log('Weights must be positive numbers')
    return
  }
  const weights = { avg, mode, max }
  if (max === undefined && mode === undefined) {
    const total = (100 - avg) / 2
    weights.mode = total
    weights.max = total
  } else if (max === undefined || mode === undefined) {
    let key = (max === undefined) ? 'max' : 'mode'
    let val = (max === undefined) ? mode : max
    if (avg + val <= 100) {
      weights[key] = 100 - (avg + val)
    } else {
      console.log('Weights are greater than 100')
      return
    }
  }
  if (weights.avg + weights.mode + weights.max === 100) {
    weights.avg = weights.avg / 100
    weights.mode = weights.mode / 100
    weights.max = weights.max / 100
    return weights
  } else {
    console.log('The sum of the weights must equal 100')
  }
}

// SET DEFAULTS HERE
const weights = setWeights(60, 20, 20)
const maxLength = 400
const minLength = 80
const aveCharLength = 14

const cellWidth = val => {
  return val ? val.toString().length * aveCharLength : 0
}

const weightColumns = (avg, mode, max, min) => {
  const modeMax = mode.reduce((max, val) => {
    return (max > val) ? max : val
  }, 0)
  const weightedVal = (weights.avg * avg) + (weights.mode * modeMax) + (weights.max * max)
  // console.log(`weightedVal: ${weightedVal}, min: ${min}`)
  if (weightedVal < min) {
    return Math.round(min)
  }
  return weightedVal < maxLength ? Math.round(weightedVal) : maxLength
}

const reducer = (acc, row, i, data) => {
  Object.keys(row).forEach((key) => {
    const width = cellWidth(row[key])
    // create a acc[key] entry
    acc[key] || (acc[key] = 0)
    // summing all the cellWidths for that column
    acc[`_${key}Avg`] || (acc[`_${key}Avg`] = 0)
    acc[`_${key}Avg`] += width
    // counting number of entries with that column
    acc[`_${key}`] || (acc[`_${key}`] = 0)
    acc[`_${key}`]++
    // keeping track of the Max value of that column
    acc[`_${key}Max`] || (acc[`_${key}Max`] = 0)
    acc[`_${key}Max`] = (acc[`_${key}Max`] > width) ? acc[`_${key}Max`] : width
    // mode set up
    acc[`_${key}Mode`] || (acc[`_${key}Mode`] = [])
    acc[`_${key}ModeObj`] || (acc[`_${key}ModeObj`] = {})
    // if an entry with that width hasn't been added yet, then initialize
    acc[`_${key}ModeObj`][width] || (acc[`_${key}ModeObj`][width] = 0)
    // increment that value and also set it to variable i
    acc[`_${key}ModeObj`][width]++
    let index = acc[`_${key}ModeObj`][width]
    // if an entry in the mode array has not been initialized yet, inialize with empy array
    acc[`_${key}Mode`][index] || (acc[`_${key}Mode`][index] = [])
    // push the width
    acc[`_${key}Mode`][index].push(width)
  })

  if (i === data.length - 1) {
    Object.keys(acc).forEach(key => {
      if (key[0] !== '_') {
        acc[`_${key}Avg`] = acc[`_${key}Avg`] / acc[`_${key}`]
        if (!acc[`_${key}Min`]) {
          acc[`_${key}Min`] = minLength
        }
        acc[key] = weightColumns(acc[`_${key}Avg`], acc[`_${key}Mode`].pop(), acc[`_${key}Max`], acc[`_${key}Min`])
      }
      delete acc[`_${key}`]
      delete acc[`_${key}Avg`]
      delete acc[`_${key}Mode`]
      delete acc[`_${key}ModeObj`]
      delete acc[`_${key}Max`]
      delete acc[`_${key}Min`]
    })
  }
  return acc
}

const headersColWidth = dataset => {
  let headers = {}
  if (dataset && dataset.structure && dataset.structure.schema && dataset.structure.schema.fields) {
    dataset.structure.schema.fields.forEach(val => {
      const key = val.name
      const width = cellWidth(key)
      headers[key] = width
    })
  }
  return headers
}

const initialObj = dataset => {
  let headers = {}
  dataset.structure.schema.fields.forEach(val => {
    const key = val.name
    const width = cellWidth(key)
    headers[key] = 0
    headers[`_${key}Avg`] = width
    headers[`_${key}Max`] = width
    headers[`_${key}Mode`] = [[width]]
    headers[`_${key}ModeObj`] = { [width]: 1 }
    headers[`${key}`] = 1
    headers[`_${key}Min`] = width
    // console.log(`key: ${key}, min: ${headers[`_${key}Min`]}`)
  })
  return headers
}

const defaultColumnWidths = (dataset, data) => {
  const headers = initialObj(dataset)
  if (data === undefined || data.length === 0) {
    return headersColWidth(dataset)
  }
  return data.reduce(reducer, headers)
}

export default defaultColumnWidths
// const result = columnWidth(data, datasetRef)

// console.log(result)
