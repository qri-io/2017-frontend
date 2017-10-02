
export function metadataId (userId, subjectHash) {
  return `${userId}.${subjectHash}`
}

export function selectMetadataByKey (state, key) {
  const { metadata } = state.entities
  return Object.keys(metadata).filter(id => metadata[id].keyId == key).map(id => metadata[id])
}

export function selectLocalMetadata (state, userId, subjectHash) {
  if (!userId || !subjectHash) { return undefined }
  return state.locals.metadata[metadataId(userId, subjectHash)]
}

export function selectMetadata (state, userId, subjectHash) {
  if (!userId || !subjectHash) { return undefined }
  return state.entities.metadata[metadataId(userId, subjectHash)]
}
