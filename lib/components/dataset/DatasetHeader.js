import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import DatasetRefProps from '../../propTypes/datasetRefProps'
import DatasetName from '../DatasetName'
import Hash from '../Hash'
import NavLinks from '../chrome/NavLinks'

import { addActiveToLink, datasetLinks } from '../../utils/links.js'
import Base from '../Base'

class DatasetHeader extends Base {
  constructor (props) {
    super(props)
    this.state = {
      readMore: true
    };
    [
      'handleReadMore',
      'renderRef'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleReadMore (e) {
    this.setState({ readMore: !this.state.readMore })
  }

  renderRef () {
    const { peername, name, datasetRef, isLatestDataset } = this.props
    return (
      <div>
        <DatasetName peername={peername} name={name || 'unnamed dataset'} xlarge link style={{ display: 'inline-block' }} />
        <Hash hash={datasetRef.path} style={{ marginBottom: 15 }} old={!isLatestDataset} />
      </div>
    )
  }

  render () {
    const { url, datasetRef, fromRegistry, isLocal, sessionProfile } = this.props
    const { dataset } = datasetRef
    const pathname = this.props.location.pathname // this is why we need to wrap with 'withRouter'

    const linkList = datasetLinks(dataset, fromRegistry, isLocal, sessionProfile)

    return (
      <div className='border headerHeight dataset-header-wrap'>
        {this.renderRef()}
        <div className='dataset-header-links' >
          { url && linkList && <NavLinks url={url} linkList={addActiveToLink(linkList, pathname, 'Overview')} sm /> }
        </div>
      </div>
    )
  }
}

export default withRouter(DatasetHeader)

DatasetHeader.propTypes = {
  // dataset data model
  datasetRef: DatasetRefProps,
  onGoBack: PropTypes.func,
  exportPath: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  peer: PropTypes.bool,
  sessionProfile: PropTypes.string,
  peername: PropTypes.string,
  name: PropTypes.string
}

DatasetHeader.defaultProps = {
}
