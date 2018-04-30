import PropTypes from 'prop-types'
import MetaProps from './metaProps'

export const formatProps = PropTypes.oneOf(['csv', 'json'])

export const typeProps = PropTypes.oneOf([
  'string',
  'number',
  'integer',
  'boolean',
  'null',
  'object',
  'array'
])

export const commitProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    timestamp: PropTypes.string
  })
])

export const structureProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    format: formatProps,
    formatConfig: PropTypes.object,
    schema: PropTypes.object,
    length: PropTypes.number.isRequired
  })
])

export const transformProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    outputStructure: structureProps,
    statement: PropTypes.string,
    structures: PropTypes.objectOf(structureProps),
    syntax: PropTypes.string,
    resources: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    )
  })
])

export const datasetProps = PropTypes.shape({
  commit: commitProps,
  meta: MetaProps,
  transform: transformProps,
  structure: structureProps,
  data: PropTypes.string,
  prevPath: PropTypes.string
})

export default PropTypes.shape({
  dataset: datasetProps.isRequired,
  name: PropTypes.string,
  path: PropTypes.string.isRequired
})
