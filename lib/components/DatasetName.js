import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export default class DatasetName extends React.PureComponent {
  constructor (props) {
    super(props);
    [
      'renderName'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderName (link, peername, name) {
    if (link) {
      return (
        <span>
          <NavLink to={'/' + peername}>{peername}</NavLink>
          <span className='dataset-name-slash'>/</span>
          <NavLink to={`/${peername}/${name}`
          }>{name}</NavLink>
        </span>
      )
    }

    if (peername) {
      return (<span>{peername}/{name}</span>)
    }
    return (<span>{name}</span>)
  }

  render () {
    const { peername, name, large, style, rename, xlarge, link } = this.props
    var datasetClass = 'linkMedium'
    if (large) {
      datasetClass = 'linkLarge'
    }
    if (xlarge) {
      datasetClass = 'linkXLarge'
    }
    return (
      <div className={datasetClass} style={style}>
        { this.renderName(link, peername, name) }
        { rename ? <span title='edit dataset name' className={`icon-inline dataset-name-edit`} onClick={() => rename()}>pen</span> : undefined }
      </div>
    )
  }
}

DatasetName.propTypes = {
  style: PropTypes.object,
  peername: PropTypes.string,
  name: PropTypes.string.isRequired,
  large: PropTypes.bool.isRequired,
  rename: PropTypes.func
}

DatasetName.defaultProps = {
  style: {},
  large: false
}
