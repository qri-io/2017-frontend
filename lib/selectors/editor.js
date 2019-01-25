export function selectDatasetValid (state) {
  const { editor } = state
  if (!(editor && editor.stringified)) {
    return false
  }
  const sections = Object.keys(editor.stringified)
  var valid = true
  var invalidSections = []

  sections.forEach(k => {
    if (!editor.stringified[k].parsable) {
      invalidSections.push(k)
      valid = false
    }
  })

  if (valid) {
    return true
  }

  if (invalidSections.length === 1) {
    return 'dataset section ' + invalidSections + ' is invalid, please fix before trying to save'
  }

  return 'dataset sections ' + invalidSections + ' are invalid, please fix before trying to save'
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

export function selectBodyParsable (state) {
  return state && state.editor && state.editor.stringified && state.editor.stringified.body && state.editor.stringified.body.parsable
}

export function selectRowOrder (state) {
  return state && state.editor && state.editor.rowOrder
}

export function selectColOrder (state) {
  return state && state.editor && state.editor.colOrder
}
