import PropTypes from 'prop-types'

export const formatProps = PropTypes.oneOf(['csv'])

export const typeProps = PropTypes.oneOf(['string', 'float'])

export const formatConfigProps = PropTypes.shape({
  headerRow: PropTypes.bool
})

export const fieldsProps = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string
  })
)

export const schemaProps = PropTypes.shape({
  fields: fieldsProps
})

export const structureProps = PropTypes.shape({
  format: formatProps,
  formatConfig: formatConfigProps,
  schema: schemaProps
})

export const datasetProps = PropTypes.shape({
  data: PropTypes.string.isRequired,
  descripton: PropTypes.string,
  length: PropTypes.number,
  query: PropTypes.shape({
    outputStructure: structureProps,
    statement: PropTypes.string,
    structures: PropTypes.objectOf(structureProps),
    syntax: PropTypes.string
  }),
  queryString: PropTypes.string,
  resources: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  structure: structureProps,
  timestamp: PropTypes.string,
  title: PropTypes.string
})

export default PropTypes.shape({
  dataset: datasetProps.isRequired,
  name: PropTypes.string,
  path: PropTypes.string.isRequired
})
