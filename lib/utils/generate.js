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
  return { body: newBody,
    schema: {
      type: 'array',
      items: {
        type: 'array',
        items: newColumnHeaders
      }
    }
  }
}
