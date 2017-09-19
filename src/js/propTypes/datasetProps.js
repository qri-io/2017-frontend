import { PropTypes } from 'react'

export const formatProps = PropTypes.oneOf(['csv'])

export const typeProps = PropTypes.oneOf(['string', 'float'])

export const formatConfigProps = PropTypes.shape({
  headerRow: PropTypes.bool
})

export const schemaProps = PropTypes.shape({
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string
    })
  )
})

export const structureProps = PropTypes.shape({
  format: formatProps,
  formatConfig: formatConfigProps,
  schema: schemaProps
})

export default PropTypes.shape({
  dataset: PropTypes.shape({
    data: PropTypes.string,
    length: PropTypes.number,
    query: PropTypes.shape({
      outputStructure: structureProps,
      statement: PropTypes.string,
      structures: PropTypes.objectOf(structureProps),
      syntax: PropTypes.string
    }),
    queryString: PropTypes.string,
    resources: PropTypes.objectOf(PropTypes.string),
    structure: structureProps,
    timestamp: PropTypes.string,
    title: PropTypes.string
  }),
  path: PropTypes.string
})
