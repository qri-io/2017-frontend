export function selectDatasetValid (state) {
  const { editor } = state
  const sections = Object.keys(editor.stringified)
  var valid = true
  var invalid_sections = []

  sections.forEach(k => {
    if (!editor.stringified[k].parsable) {
      invalid_sections.push(k)
      valid = false
    }
  })

  if (valid) {
    return true
  }

  if (invalid_sections.length === 1) {
    return 'dataset section ' + invalid_sections + ' is invalid, please fix before trying to save'
  }

  return 'dataset sections ' + invalid_sections + ' are invalid, please fix before trying to save'
}

export function selectSchemaString (state) {
  return state && state.editor && state.editor.stringified && state.editor.stringified.schema && state.editor.stringified.schema.string
}

export function selectBodyView (state) {
  return state && state.editor && state.editor.bodyView
}

export function selectBodyString (state) {
  return state && state.editor && state.editor.stringified && state.editor.stringified.body && state.editor.stringified.body.string
}
