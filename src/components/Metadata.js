import React, { PropTypes } from 'react'

// order of special keys. most important key is **LAST**
const keys = ['title', 'description', 'theme', 'keyword']

// sortPriorityKeys returns a function to be used with Array.prototype.sort()
// it accepts an array of items to prioritize over natural order comparison.
// aka: let's you pull stuff out of an alphabetical list to put at the top.
function priorityCompare (list) {
  list = list.reverse()
  return (a, b) => {
    const ai = list.findIndex((k) => k == a)
    const bi = list.findIndex((k) => k == b)

    // if neither is a priority string, regular comparison
    if (ai == -1 && bi == -1) {
      const nameA = a.toLowerCase() // ignore upper and lowercase
      const nameB = b.toLowerCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
    } else if (ai > bi) {
      return -1
    } else if (ai < bi) {
      return 1
    }

    // equal
    return 0
  }
}

// Metadata is a static metadata viewer
const Metadata = ({ metadata }) => {
  return (
    <div className='metadata'>
      {Object.keys(metadata).sort(priorityCompare(keys)).map((key) => {
        return (
          <div key={key}>
            <label className='yellow meta label'>{key}</label>
            <p>{metadata[key]}</p>
          </div>
        )
      })}
    </div>
  )
}

Metadata.propTypes = {
  metadata: PropTypes.object
}

Metadata.defaultProps = {
}

export default Metadata
