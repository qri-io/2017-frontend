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
