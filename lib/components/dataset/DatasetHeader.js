import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import DatasetRefProps from '../../propTypes/datasetRefProps'
import Button from '../Button'
import DatasetName from '../DatasetName'
import Header from '../Header'
import Hash from '../Hash'

import { defaultPalette } from '../../propTypes/palette'
import { addActiveToLink } from '../../utils/links.js'
import Base from '../Base'

class DatasetHeader extends Base {
  constructor (props) {
    super(props)
    this.state = {
      readMore: true
    };
    [
      'handleReadMore',
      'renderRef',
      'renderButtons'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleReadMore (e) {
    this.setState({ readMore: !this.state.readMore })
  }

  renderRef (css) {
    const { peername, name, datasetRef, isLatestDataset } = this.props
    return (
      <div>
        <DatasetName peername={peername} name={name || 'unnamed dataset'} large link style={{ display: 'inline-block', marginTop: 15 }} />
        <Hash hash={datasetRef.path} style={{ marginBottom: 15 }} old={!isLatestDataset} />
      </div>
    )
  }

  renderButtons (css) {
    const { onClickDelete, onClickAdd } = this.props
    return (
      <div className={css('buttons')}>
        { onClickDelete ? <span className={css('button')}><Button text='Remove' onClick={onClickDelete} color='d' name='remove' /></span> : undefined }
        { onClickAdd ? <span className={css('button')}><Button text='Add' onClick={onClickAdd} color='a' name='add' /></span> : undefined }
      </div>
    )
  }

  template (css) {
    const { url: baseUrl, transfering, datasetRef } = this.props
    const pathname = this.props.location.pathname // this is why we need to wrap with 'withRouter'
    let linkList = [
      {
        name: 'Dataset',
        link: 'overview'
      }
    ]

    // if there is no Viz section in the dataset, don't show 'Render' as an option in the
    // navigation bar
    const hasViz = datasetRef && datasetRef.dataset && datasetRef.dataset.viz
    if (hasViz) {
      linkList.splice(1, 0, {
        name: 'Render',
        link: 'render'
      })
    }
    linkList.push({ name: 'Export', link: 'export' })

    return (
      <Header
        leftChild={this.renderRef(css)}
        rightChild={this.renderButtons(css)}
        url={baseUrl}
        linkList={addActiveToLink(linkList, pathname, 'Dataset')}
        spinner={transfering}
      />
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        width: '100%',
        height: 140,
        background: palette.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      top: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20
      },
      buttons: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        margin: '10px 0 10px 0',
        width: 220
      },
      button: {
        marginLeft: 20
      }
    }
  }
}

export default withRouter(DatasetHeader)

DatasetHeader.propTypes = {
  // dataset data model
  datasetRef: DatasetRefProps,
  onGoBack: PropTypes.func,
  exportPath: PropTypes.string,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickAdd: PropTypes.func,
  peer: PropTypes.bool,
  sessionProfile: PropTypes.string,
  peername: PropTypes.string,
  name: PropTypes.string
}

DatasetHeader.defaultProps = {
}
