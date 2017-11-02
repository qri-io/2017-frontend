import React from 'react'
import { fieldsProps } from '../propTypes/datasetRefProps.js'
import Base from './Base'

function descriptionTrigger (i, fn) {
  return () => {
    fn(i)
  }
}

export default class FieldsList extends Base {
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

  template (css) {
    const { fields } = this.props
    const descriptionIndex = this.state.descriptionIndex

    return (
      <div className='Row'>
        <div className='col-md-12'>
          {
            fields.map((field, i) => {
              return (
                <div key={i} className={`${css('relative')} ${css('field')} col-md-4`} onMouseEnter={descriptionTrigger(i, this.onShowDescription)} onMouseLeave={descriptionTrigger(i, this.onHideDescription)}>
                  <p className={`purple ${css('fieldTitle')}`} >{field.name}<span className={`type dt-${field.type}`}><small>                                                                                                                                                                                                                                                                                {field.type}</small></span>
                  </p>
                  { field.description && (i === descriptionIndex) && (field.description !== field.title) ? <div className='absolute description' ><div className='description-tail'>{field.description}</div></div> : undefined }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  styles () {
    return {
      table: {
        paddingBottom: '1em',
        '::after': {
          content: ' ',
          display: 'block',
          clear: 'both'
        },
        '.field': {
          position: 'relative',
          float: 'left',
          marginRight: 15,
          paddingRight: 10,
          paddingTop: 6
        }
      },
      absolute: {
        position: 'absolute'
      },
      relative: {
        position: 'relative'
      },
      description: {
        zIndex: 10,
        background: '#46585f',
        padding: 5,
        width: '90%',
        fontSize: '.9em',
        boxShadow: '0px 3px 5px 0px rgba(24,33,37,0.50)',
        marginTop: 5,
        borderRadius: 5
      },
      field: {
        height: 100,
        padding: 5
      },
      fieldTitle: {
        margin: 0
      },
      descriptionTail: {
        width: 0,
        height: 0,
        border: '10px solid',
        borderColor: 'transparent transparent #46585f transparent',
        position: 'absolute',
        top: -20,
        left: 20,
        zIndex: '100'
      }
    }
  }
}

FieldsList.propTypes = {
  fields: fieldsProps
}

FieldsList.defaultProps = {
}
