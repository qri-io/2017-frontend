export function generateSchemaFromRow (row) {
  const items = row.map((e, i) => { return { 'title': 'col_' + (i + 1) } })
  const schema = {
    type: 'array',
    items: {
      type: 'array',
      items
    }
  }
  return schema
}

export function generateCollapsedChanges (body, columnHeaders, colOrder, rowOrder) {
  if (!rowOrder || !Array.isArray(rowOrder) || !colOrder || !Array.isArray(colOrder) || !body || !columnHeaders) {
    return
  }
  var rowMapped = rowOrder.map((position, index) => { return { index, position } })
  rowMapped.sort((a, b) => a.position - b.position)
  var newBody = rowMapped.map(el => body[el.index])

  var colMapped = colOrder.map((position, index) => { return { index, position } })
  colMapped.sort((a, b) => a.position - b.position)

  const newColumnHeaders = colMapped.map(el => columnHeaders[el.index])
  newBody = newBody.map(row => colMapped.map(el => row[el.index]))

  const newColOrder = colOrder.map((el, index) => index)
  const newRowOrder = rowOrder.map((el, index) => index)
  return {
    body: newBody,
    schema: {
      type: 'array',
      items: {
        type: 'array',
        items: newColumnHeaders
      }
    },
    rowOrder: newRowOrder,
    colOrder: newColOrder
  }
}

// takes a body and structure and returns
// the most valid version of the parsed body & structure
// if the body or schema can't be parsed, it returns a string error
export function generateValid (body, structure, colOrder, rowOrder) {
  var validBody = body
  var validStructure = structure
  var schema = structure && structure.schema

  if (typeof schema === 'string') {
    // if the schema is empty, don't pass along a schema!
    if (schema === '') {
      validStructure = Object.assign({}, structure, { schema: undefined })
    } else {
      try {
        // TODO (ramfox): this might be replaced with a generateParsedSchema
        // and generateValid might be split between generateParsedBody
        // and generateParsedSchema
        schema = JSON.parse(schema)
        validStructure['schema'] = schema
      } catch (e) {
        return 'dataset schema is invalid, please fix before trying to save'
      }
    }
  }
  // at this point, schema is either parsed correctly or undefined
  // time to check the body
  // it body is a string, parse it!
  if (typeof body === 'string') {
    // if the body is empty, don't pass along a body
    if (body === '') {
      validBody = undefined
    } else {
      try {
        validBody = JSON.parse(body)
      } catch (e) {
        return 'dataset body is invalid, please fix before trying to save'
      }
    }
  } else {
    // otherwise, it is an object. The only case where the body would be an
    // object, and stored in the dataset editor, is if it is a 2D array
    // with a schema. Collapse any changes. If there are changes, pass
    // them to the validBody and validStructure vars
    const columnHeaders = schema && schema.items && schema.items.items
    const changes = generateCollapsedChanges(validBody, columnHeaders, colOrder, rowOrder)
    if (changes) {
      validBody = changes.body
      validStructure['schema'] = changes.schema
    }
  }

  return { body: validBody, structure: validStructure }
}
