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
const datasetSchema = new schema.Entity('datasets', {}, { idAttribute: 'path' })
const datasetDryRunSchema = new schema.Entity('datasetDryRuns', {}, { idAttribute: 'path' })
const bodySchema = new schema.Entity('body', {}, {
  idAttribute: 'path' })
const profileSchema = new schema.Entity('profiles', {}, { idAttribute: 'id' })
const searchSchema = new schema.Entity('search', {}, { idAttribute: 'ID' })

datasetSchema.new = function (attrs) {
  return Object.assign({ path: 'new' }, attrs)
}

profileSchema.new = function (attrs) {
  return Object.assign({}, { id: 'new' }, attrs)
}

bodySchema.new = function (attrs) {
  return Object.assign({}, { id: 'new' }, attrs)
}

searchSchema.new = function (attrs) {
  return Object.assign({}, { id: 'new' }, attrs)
}

// Schemas for Github API responses.
const Schemas = {
  DATASET: datasetSchema,
  DATASET_ARRAY: new schema.Array(datasetSchema),

  DATASET_DRY_RUN: datasetDryRunSchema,

  STRUCTURED_DATA: bodySchema,

  PROFILE: profileSchema,
  PROFILE_ARRAY: new schema.Array(profileSchema),

  SEARCH: searchSchema,
  SEARCH_ARRAY: new schema.Array(searchSchema)
}

export default Schemas
