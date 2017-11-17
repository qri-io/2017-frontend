import { Schema, arrayOf } from 'normalizr'
// TODO result_cid is assigned a value but never used, consider depreciation
// TODO resutl_cid is not in camel case
// let result_cid = 0

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const sessionUserSchema = new Schema('session')
const sshKeySchema = new Schema('ssh_keys', { idAttribute: 'sha256' })
const userSchema = new Schema('users')
const datasetSchema = new Schema('namespace', { idAttribute: 'path' })
const readmeSchema = new Schema('readmes', { idAttribute: 'address' })
const querySchema = new Schema('queries', { idAttribute: 'path' })
const peerSchema = new Schema('peers', { idAttribute: 'id' })
// const resultSchema = new Schema('results', { idAttribute : (result) => 'result' });
const peerNamespaceSchema = new Schema('peerNamespace', {idAttribute: 'path'})
const structuredDataSchema = new Schema('data', { idAttribute: 'path' })
const migrationSchema = new Schema('migrations')
const changeSchema = new Schema('changes')
const inviteSchema = new Schema('invites')
const roleSchema = new Schema('roles')
const metadataSchema = new Schema('metadata', { idAttribute: 'path' })
const profileSchema = new Schema('profile', { idAttribute: 'type' })
const historySchema = new Schema('history', { idAttribute: 'path' })
const connectionsSchema = new Schema('connections', { idAttribute: (connections) => 'connections' })

peerSchema.define({
  owner: userSchema
})

querySchema.define({
  owner: userSchema
})

datasetSchema.define({
  owner: userSchema,
  default_query: querySchema
})

migrationSchema.define({
  owner: userSchema,
  dataset: datasetSchema
})

roleSchema.define({
  user: userSchema
})

changeSchema.define({
  owner: userSchema,
  dataset: datasetSchema
})

datasetSchema.new = function (attrs) {
  return Object.assign({
    'name': 'new dataset'
  }, { path: 'new' }, attrs)
}

readmeSchema.new = function (attrs) {
  return Object.assign({ text: '' }, attrs, { id: 'new' })
}

migrationSchema.new = function (attrs) {
  return Object.assign({}, attrs, { id: 'new' })
}

changeSchema.new = function (attrs) {
  return Object.assign({}, attrs, { id: 'new' })
}

querySchema.new = function (attrs) {
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
  SSH_KEY_ARRAY: arrayOf(sshKeySchema),
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  DATASET: datasetSchema,
  DATASET_ARRAY: arrayOf(datasetSchema),
  README: readmeSchema,
  MIGRATION: migrationSchema,
  MIGRATION_ARRAY: arrayOf(migrationSchema),
  CHANGE: changeSchema,
  CHANGE_ARRAY: arrayOf(changeSchema),
  QUERY: querySchema,
  QUERY_ARRAY: arrayOf(querySchema),
  PEER: peerSchema,
  PEER_ARRAY: arrayOf(peerSchema),
  PEER_NAMESPACE: peerNamespaceSchema,
  PEER_NAMESPACE_ARRAY: arrayOf(peerNamespaceSchema),
  INVITE: inviteSchema,
  ROLE: roleSchema,
  ROLE_ARRAY: arrayOf(roleSchema),
  STRUCTURED_DATA: structuredDataSchema,
  METADATA: metadataSchema,
  METADATA_ARRAY: arrayOf(metadataSchema),
  PROFILE: profileSchema,
  HISTORY: historySchema,
  HISTORY_ARRAY: arrayOf(historySchema),
  CONNECTIONS: connectionsSchema
}

export default Schemas
