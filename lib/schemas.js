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
const sshKeySchema = new schema.Entity('ssh_keys', {}, { idAttribute: 'sha256' })
const userSchema = new schema.Entity('users')
const datasetSchema = new schema.Entity('namespace', {
  // owner: userSchema,
  // default_query: querySchema
}, { idAttribute: 'path' })
const readmeSchema = new schema.Entity('readmes', {}, { idAttribute: 'address' })
const peerSchema = new schema.Entity('peers', { owner: userSchema }, { idAttribute: 'id' })
// const resultSchema = new schema.Entity('results', { idAttribute : (result) => 'result' });
const peerNamespaceSchema = new schema.Entity('peerNamespace', {}, {idAttribute: 'path'})
const structuredDataSchema = new schema.Entity('data', {}, { idAttribute: 'path' })
const changeSchema = new schema.Entity('changes', {
  owner: userSchema,
  dataset: datasetSchema
})
const inviteSchema = new schema.Entity('invites')
const roleSchema = new schema.Entity('roles', {
  user: userSchema
})
const metadataSchema = new schema.Entity('metadata', {}, { idAttribute: 'path' })
const profileSchema = new schema.Entity('profile', {}, { idAttribute: 'type' })
const historySchema = new schema.Entity('history', {}, { idAttribute: 'path' })
const connectionsSchema = new schema.Entity('connections', {}, { idAttribute: (connections) => 'connections' })

datasetSchema.new = function (attrs) {
  return Object.assign({
    'name': 'new dataset'
  }, { path: 'new' }, attrs)
}

readmeSchema.new = function (attrs) {
  return Object.assign({ text: '' }, attrs, { id: 'new' })
}

changeSchema.new = function (attrs) {
  return Object.assign({}, attrs, { id: 'new' })
}

peerSchema.new = function (attrs) {
  return Object.assign({}, { id: 'new' }, attrs)
}

peerNamespaceSchema.new = function (attrs) {
  return Object.assign({}, { id: 'new' }, attrs)
}

inviteSchema.new = function (attrs) {
  return Object.assign({}, attrs, { id: 'new' })
}

roleSchema.new = function (attrs) {
  return Object.assign({}, attrs, { id: 'new' })
}

metadataSchema.new = (attrs) => {
  return Object.assign({}, attrs)
}

profileSchema.new = (attrs) => {
  return Object.assign({}, attrs)
}

historySchema.new = (attrs) => {
  return Object.assign({}, attrs)
}

connectionsSchema.new = (attrs) => {
  return Object.assign({}, attrs)
}

// Schemas for Github API responses.
const Schemas = {
  SESSION_USER: sessionUserSchema,
  SSH_KEY: sshKeySchema,
  SSH_KEY_ARRAY: new schema.Array(sshKeySchema),
  USER: userSchema,
  USER_ARRAY: new schema.Array(userSchema),
  DATASET: datasetSchema,
  DATASET_ARRAY: new schema.Array(datasetSchema),
  README: readmeSchema,
  CHANGE: changeSchema,
  CHANGE_ARRAY: new schema.Array(changeSchema),
  PEER: peerSchema,
  PEER_ARRAY: new schema.Array(peerSchema),
  PEER_NAMESPACE: peerNamespaceSchema,
  PEER_NAMESPACE_ARRAY: new schema.Array(peerNamespaceSchema),
  INVITE: inviteSchema,
  ROLE: roleSchema,
  ROLE_ARRAY: new schema.Array(roleSchema),
  STRUCTURED_DATA: structuredDataSchema,
  METADATA: metadataSchema,
  METADATA_ARRAY: new schema.Array(metadataSchema),
  PROFILE: profileSchema,
  HISTORY: historySchema,
  HISTORY_ARRAY: new schema.Array(historySchema),
  CONNECTIONS: connectionsSchema
}

export default Schemas
