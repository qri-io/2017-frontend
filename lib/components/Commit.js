import React from 'react'

import Json from './Json'
import Base from './Base'
import CommitProps from '../propTypes/commitProps.js'

export default class Commit extends Base {
  template (css) {
    const { commit } = this.props

    if (commit === undefined) {
      return (<p>No commit found for this dataset.</p>)
    }

    return (
      <Json body={commit} />
    )
  }

  styles () {
    return {
    }
  }
}

Commit.propTypes = {
  commit: CommitProps
}

Commit.defaultProps = {
}
