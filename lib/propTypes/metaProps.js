import PropTypes from 'prop-types'

export const citationProps = PropTypes.shape({
  name: PropTypes.string,
  url: PropTypes.string,
  email: PropTypes.string
})

export const userProps = PropTypes.shape({
  id: PropTypes.string,
  fullname: PropTypes.string,
  email: PropTypes.string
})

export default PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    path: PropTypes.string,
    accessPath: PropTypes.string,
    accrualPeriodicity: PropTypes.string,
    citations: PropTypes.arrayOf(citationProps),
    contributors: PropTypes.arrayOf(userProps),
    description: PropTypes.string,
    downloadPath: PropTypes.string,
    homePath: PropTypes.string,
    identifier: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    language: PropTypes.arrayOf(PropTypes.string),
    license: PropTypes.Object,
    qri: PropTypes.string,
    readmePath: PropTypes.string,
    title: PropTypes.string,
    theme: PropTypes.arrayOf(PropTypes.string),
    version: PropTypes.string
  })
])
