import { connect } from 'react-redux'

import { selectProfileById } from '../selectors/profiles'
import { loadProfileById } from '../actions/profiles'
import CommitItem from '../components/item/CommitItem'

const CommitItemContainer = connect(
  (state, ownProps) => {
    const profile = ownProps.data && selectProfileById(state, ownProps.data.profileID)
    return Object.assign({}, {
      profile
    }, state.console, ownProps)
  }, {
    loadProfileById
  }
)(CommitItem, 'CommitItem')

export default CommitItemContainer
