import { PropTypes } from 'react'

export const formatProps = React.PropTypes.oneOf(['csv'])

export const typeProps = React.PropTypes.oneOf(['string', 'float'])

export const formatConfigProps = React.PropTypes.shape({
  headerRow: React.PropTypes.bool
})

export const schemaProps = React.PropTypes.shape({
  fields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string,
      type: React.PropTypes.string
    })
  )
})

export const structureProps = React.PropTypes.shape({
  format: formatProps,
  formatConfig: formatConfigProps,
  schema: schemaProps
})

export default PropTypes.shape({
  dataset: React.PropTypes.shape({
    data: React.PropTypes.string,
    length: React.PropTypes.number,
    query: React.PropTypes.shape({
      outputStructure: structureProps,
      statement: React.PropTypes.string,
      structures: React.PropTypes.objectOf(structureProps),
      syntax: React.PropTypes.string
    }),
    queryString: React.PropTypes.string,
    resources: React.PropTypes.objectOf(React.PropTypes.string),
    structure: structureProps,
    timestamp: React.PropTypes.string,
    title: React.PropTypes.string
  }),
  path: Reach.PropTypes.string
})
