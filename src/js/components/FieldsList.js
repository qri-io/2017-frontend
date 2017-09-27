import React, { PropTypes } from 'react'
import { fieldsProps } from '../propTypes/datasetRefProps.js'

function descriptionTrigger (i, fn) {
  return () => {
    fn(i)
  }
}

export default class FieldsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      descriptionIndex: -1,
      editMetadata: false
    };

    [
      'onShowDescription',
      'onHideDescription',
      'onEditMetadata',
      'onShowMetadata'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onShowDescription (i) {
    this.setState({ descriptionIndex: i })
  }

  onHideDescription (i) {
    this.setState({ descriptionIndex: -1 })
  }

  onEditMetadata () {
    this.setState( editMetadata: true )
  }

  onShowMetadata () {
    this.setState( editMetadata: false )
  }

  renderFields() {
    if ( editMetadata ) {
      return (
        <p>TIME TO EDIT SOME METADATAAAA</p>
        )
    } else {
      fields.map((field, i) => {
        return (
          <div key={i} className='relative field col-md-4' onMouseEnter={descriptionTrigger(i, this.onShowDescription)} onMouseLeave={descriptionTrigger(i, this.onHideDescription)}>
            <p className='purple field-title' >{field.title || field.name}<span className={`type dt-${field.type}`}><small>  {field.type}</small></span>
            </p>
            { field.description && (i === descriptionIndex) && (field.description !== field.title) ? <div className='absolute description'><div className='description-tail' />{field.description}</div> : undefined }
          </div>
        )
      })
    }
  }

  render () {
    const { fields } = this.props
    const descriptionIndex = this.state.descriptionIndex
    const showEditMetadata = this.state.showEditMetadata
    return (
      <div className='wrapper'>
        <div className='Row'>
          <div className='col-md-12'>
            { editMetadata ? <a className='right' onClick({ () => this.onShowMetadata})>Show Metadata</a> : <a className='right' onClick={ () => this.onEditMetadata}>Edit Metadata</a> }
          </div>
        </div>
        <div className='Row'>
          <div className='col-md-12'>
            
          </div>
        </div>
      </div>
    )
  }
}

FieldsList.propTypes = {
  fields: fieldsProps
}

FieldsList.defaultProps = {
}
