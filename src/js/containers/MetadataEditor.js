import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Metadata from '../components/Metadata'
import MetadataForm from '../components/form/MetadataForm'

import { newMetadata, editMetadata, updateMetadata, cancelMetadataEdit, saveMetadata, loadMetadata } from '../actions/metadata'
import { selectLocalMetadata, selectMetadata } from '../selectors/metadata'
import { selectDefaultKeyId } from '../selectors/keys'

class MetadataEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showHelp: true
    };

    [
      'handleNew',
      'handleEdit',
      'handleChange',
      'handleCancel',
      'handleSave',
      'handleToggleHelp'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  componentWillMount () {
    if (this.props.sessionKeyId) {
      this.props.loadMetadata(this.props.sessionKeyId, this.props.subjectHash)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.sessionKeyId != this.props.sessionKeyId) {
      nextProps.loadMetadata(nextProps.sessionKeyId, this.props.subjectHash)
    }
  }

  handleNew () {
    this.props.newMetadata(this.props.sessionKeyId, this.props.subjectHash)
  }

  handleEdit () {
    this.props.editMetadata(this.props.savedMetadata)
  }

  handleChange (name, value) {
    const change = { meta: Object.assign({}, this.props.metadata.meta, { [name]: value }) }
    this.props.updateMetadata(Object.assign({}, this.props.metadata, change))
  }

  handleCancel () {
    this.props.cancelMetadataEdit(this.props.metadata)
  }

  handleSave (meta) {
    this.props.saveMetadata({ keyId: this.props.sessionKeyId, subject: this.props.subjectHash, meta })
    // TODO - this should be in a "then" clause on saveMetadata
    this.props.cancelMetadataEdit(this.props.metadata)
  }

  handleToggleHelp () {
    this.setState({ showHelp: !this.state.showHelp })
  }

  render () {
    const { savedMetadata, metadata, sessionKeyId } = this.props
    const { showHelp } = this.state

    if (savedMetadata && !metadata) {
      return (
        <div className='metadata editor col-md-12'>
          <Metadata metadata={savedMetadata.meta} />
          {sessionKeyId ? <button className='btn btn-primary' onClick={this.handleEdit}>Edit</button> : <p><Link to='/signup'>Signup</Link> to edit metadata.</p>}
        </div>
      )
    } else if (!metadata) {
      return (
        <div className='metadata editor col-md-12'>
          {sessionKeyId ? <button className='btn btn-primary' onClick={this.handleNew}>Add Metadata</button> : <p><Link to='/signup'>Signup</Link> to add metadata.</p>}
        </div>
      )
    }

    return (
      <div className='metadata editor col-md-12'>
        <a className='helpToggle right' onClick={this.handleToggleHelp}>{showHelp ? 'hide help' : 'show help' }</a>
        <MetadataForm
          data={metadata.meta}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
          onSubmit={this.handleSave}
          showHelpText={showHelp}
        />
        <br />
      </div>
    )
  }
}

MetadataEditor.propTypes = {
  sessionKeyId: PropTypes.string,
  subjectHash: PropTypes.string.isRequired,

  metadata: PropTypes.object,
  savedMetadata: PropTypes.object,

  newMetadata: PropTypes.func.isRequired,
  editMetadata: PropTypes.func.isRequired,
  updateMetadata: PropTypes.func.isRequired,
  cancelMetadataEdit: PropTypes.func.isRequired,
  loadMetadata: PropTypes.func.isRequired,
  saveMetadata: PropTypes.func.isRequired
}

MetadataEditor.defaultProps = {
}

function mapStateToProps (state, ownProps) {
  const subjectHash = ownProps.subjectHash
  const sessionKeyId = selectDefaultKeyId(state)

  return Object.assign({
    sessionKeyId,
    savedMetadata: selectMetadata(state, sessionKeyId, subjectHash),
    metadata: selectLocalMetadata(state, sessionKeyId, subjectHash)
  }, ownProps)
}

export default connect(mapStateToProps, {
  newMetadata,
  editMetadata,
  updateMetadata,
  cancelMetadataEdit,
  loadMetadata,
  saveMetadata
})(MetadataEditor)
