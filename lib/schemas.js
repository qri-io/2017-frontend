import { schema } from 'normalizr'
// TODO result_cid is assigned a value but never used, consider depreciation
// TODO resutl_cid is not in camel case
// let result_cid = 0

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const sessionUserSchema = new schema.Entity('session')
const datasetSchema = new schema.Entity('datasets', {
  // owner: userSchema,
  // default_query: querySchema
}, { idAttribute: 'path' })

const structuredDataSchema = new schema.Entity('data', {}, { idAttribute: 'path' })
const historySchema = new schema.Entity('history', {}, { idAttribute: 'path' })
const peerSchema = new schema.Entity('peers', { /* owner: userSchema */ }, { idAttribute: 'id' })
const peerNamespaceSchema = new schema.Entity('peerNamespace', {}, {idAttribute: 'path'})
const connectionsSchema = new schema.Entity('connections', {}, { idAttribute: (connections) => 'connections' })

datasetSchema.new = function (attrs) {
  return Object.assign({
    'name': 'new dataset'
  }, { path: 'new' }, attrs)
}

historySchema.new = (attrs) => {
  return Object.assign({}, attrs)
}

peerSchema.new = function (attrs) {
  return Object.assign({}, { id: 'new' }, attrs)
}

peerNamespaceSchema.new = function (attrs) {
  return Object.assign({}, { id: 'new' }, attrs)
}

connectionsSchema.new = (attrs) => {
  return Object.assign({}, attrs)
}

// Schemas for Github API responses.
const Schemas = {
  SESSION_USER: sessionUserSchema,
  DATASET: datasetSchema,
  DATASET_ARRAY: new schema.Array(datasetSchema),

  HISTORY: historySchema,
  HISTORY_ARRAY: new schema.Array(historySchema),

  STRUCTURED_DATA: structuredDataSchema,

  PEER: peerSchema,
  PEER_ARRAY: new schema.Array(peerSchema),
  PEER_NAMESPACE: peerNamespaceSchema,
  PEER_NAMESPACE_ARRAY: new schema.Array(peerNamespaceSchema),

  CONNECTIONS: connectionsSchema
}

export default Schemas
