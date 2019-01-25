export function selectSchemaString (state) {
  return state && state.editor && state.editor.stringified && state.editor.stringified.schema && state.editor.stringified.schema.string
}

export function selectSchema (state) {
  return state && state.editor && state.editor.dataset && state.editor.dataset.structure && state.editor.structure.schema
}

export function selectBodyView (state) {
  return state && state.editor && state.editor.bodyView
}

export function selectRowOrder (state) {
  return state && state.editor && state.editor.rowOrder
}

export function selectColOrder (state) {
  return state && state.editor && state.editor.colOrder
}
