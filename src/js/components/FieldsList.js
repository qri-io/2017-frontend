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
    this.state = {descriptionIndex: -1};

    [
      'onShowDescription',
      'onHideDescription'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  onShowDescription (i) {
    this.setState({ descriptionIndex: i })
  }

  onHideDescription (i) {
    this.setState({ descriptionIndex: -1 })
  }

  render () {
    const { fields } = this.props
    const descriptionIndex = this.state.descriptionIndex
    return (
      <div className='Row'>
        <div className='col-md-12'>
          {fields.map((field, i) => {
            return (
              <div key={i} className='relative field col-md-4' onMouseEnter={descriptionTrigger(i, this.onShowDescription)} onMouseLeave={descriptionTrigger(i, this.onHideDescription)}>
                <p className='purple field-title' >{field.title || field.name}<span className={`type dt-${field.type}`}><small>                                                                                                                                                                                                                                                                                                                                                                          {field.type}</small></span>
                </p>
                { field.description && (i === descriptionIndex) && (field.description !== field.title) ? <div className='absolute description'><div className='description-tail' />{field.description}</div> : undefined }
              </div>
            )
          })}
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
