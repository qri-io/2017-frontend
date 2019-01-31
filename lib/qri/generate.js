/* globals File */
import cloneDeep from 'clone-deep'

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
export function generateParsedBodyAndStructure (body, structure, colOrder, rowOrder) {
  var validBody = body
  var validStructure = structure
  var schema = structure && structure.schema
  var ext = 'json'

  // will return either parsed schema, undefined, or string error
  schema = generateParsedSchema(schema)
  if (typeof schema === 'string') {
    return schema
  }
  validStructure = Object.assign({}, structure, { schema })
  // time to check the body
  // if it is a file, make sure we have the proper extension
  if (body && body.constructor === File) {
    ext = body.name.substring(body.name.lastIndexOf('.') + 1, body.name.length)
  } else if (typeof body === 'string') {
    // it body is a string, parse it!
    // if the body is empty, don't pass along a body
    if (body === '') {
      validBody = undefined
    } else {
      try {
        validBody = JSON.parse(body)
      } catch (e) {
        return 'The dataset body is invalid.'
      }
    }
  } else if (body && body.constructor !== File) {
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
  validStructure['format'] = ext

  return { body: validBody, structure: validStructure }
}

// returns a parsed schema, undefined (if schema was false, undefined or ''), or a string error if the schema cannot be parsed
export function generateParsedSchema (schema) {
  if (!schema) {
    return undefined
  }
  if (typeof schema !== 'string') {
    return schema
  }
  try {
    const parsedSchema = JSON.parse(schema)
    return parsedSchema
  } catch (e) {
    return 'The dataset schema is invalid.'
  }
}

// generateMatchingSchemaAndBody returns a schema and body that match.
// If we are in table view, we return a parsed Body and Schema (as well as
// fresh col and row orders)
// If we are in json view, we return a stringified Body, and leave the
// schema as is
// returns { schema, body, rowOrder, colOrder }, or a string error
export function generateMatchingSchemaAndBody (bodyView, structure, prevBody, columnHeaders, colOrder, rowOrder) {
  var schema = structure && cloneDeep(structure.schema)
  var body = cloneDeep(prevBody)
  if (bodyView === 'table') {
    // case where we have the body as a string, but need it to be
    // an object
    if (typeof prevBody === 'string') {
      try {
        body = JSON.parse(prevBody)
      } catch (e) {
        return "Body is invalid in it's current state."
      }
    }
    // case where we have the body (which is an object)
    // and we want to display in table view. We need to make sure
    // it is the correct shape:
    if (!Array.isArray(body)) {
      return 'Table view is reserved for two dimentional data, the top level body must be an array.'
    }
    const row = body[0]
    if (body.some(r => !Array.isArray(r) || r.length !== row.length)) {
      return 'Table view is reserved for two dimentional data. Each element in the body must be an array and must be the same length.'
    }
    // From now one we know we have a 2D array!
    //
    // parse the schema, if its a string then it will return parsed (or as an error)
    // if it is already parsed, it will just return
    schema = generateParsedSchema(schema)
    //
    // if a string is returned from generateParsedSchema then it is
    // actually an error string, just return it.
    if (typeof schema === 'string') {
      return schema
    }
    //
    // from here on guarenteed a parsed or undefined schema!
    if (schema) {
      // We have a schema!
      if (!schema.type || schema.type !== 'array' || !schema.items || schema.items.type !== 'array' || !schema.items.items || !Array.isArray(schema.items.items) || schema.items.items.length !== row.length) {
        return 'The current schema does not match the structure of the body. If you remove the current schema, Qri will generate a basic schema for you'
      }
      // case where the body is a 2D array and we have schema that
      // matches the body!
      return {
        schema,
        colOrder: schema.items.items.map((elem, index) => index),
        rowOrder: row.map((elem, index) => index),
        body
      }
    }
    // We have do not have a schema, so we must generate it!
    schema = generateSchemaFromRow(row)
    return {
      schema,
      colOrder: schema.items.items.map((elem, index) => index),
      rowOrder: row.map((elem, index) => index),
      body
    }
  }
  // From here on in, we want the bodyView to be json:
  // case where we want to have json view, and the body is already a string
  // we don't have to make any changes
  if (typeof body === 'string') {
    return { body }
  }
  // case where we are trying to set view to json, and we have a
  // non-string body
  // we have to collapse the changes and stringify that (when we no longer use stringify)
  const changed = generateCollapsedChanges(body, columnHeaders, colOrder, rowOrder)
  if (changed) {
    body = JSON.stringify(changed.body, null, 2)
    return {
      body,
      schema: changed.schema,
      colOrder: changed.colOrder,
      rowOrder: changed.rowOrder
    }
  }

  body = JSON.stringify(body, null, 2)
  return { body }
}
