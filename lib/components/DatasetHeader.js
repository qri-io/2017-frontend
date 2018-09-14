import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'
import Button from './Button'
import DatasetName from './DatasetName'
import Hash from './Hash'
import Header from './Header'

import { defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class DatasetHeader extends Base {
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
    const { datasetRef, isLatestDataset, peername, name } = this.props
    return (
      <div>
        <DatasetName peername={peername} name={name || 'unnamed dataset'} xlarge style={{ display: 'inline-block', marginTop: 15 }} />
        <Hash hash={datasetRef.path} style={{ marginBottom: 15 }} old={!isLatestDataset} />
      </div>
    )
  }

  renderButtons (css) {
    const { datasetRef, onClickDelete, onClickAdd, exportPath } = this.props
    return (
      <div className={css('buttons')}>
        { onClickDelete ? <span className={css('button')}><Button text='Remove' onClick={onClickDelete} color='d' name='remove' /></span> : undefined }
        { onClickAdd ? <span className={css('button')}><Button text='Add' onClick={onClickAdd} color='a' name='add' /></span> : undefined }
        { exportPath ? <span className={css('button')}><Button color='c' text='Export' downloadName={datasetRef.name} download={exportPath} /></span> : undefined }
      </div>
    )
  }

  template (css) {
    const { url, transfering, datasetRef, peer } = this.props

    // if there is no Viz section in the dataset, don't show 'Render' as an option in the
    // navigation bar
    const viz = datasetRef && datasetRef.dataset && datasetRef.dataset.viz
    var linkList = [
      {
        name: 'Render',
        link: 'render'
      },
      {
        name: 'Dataset',
        link: 'summary'
      },
      {
        name: 'Body',
        link: 'body'
      }
    ]

    if (!viz) {
      linkList = [
        {
          name: 'Dataset',
          link: 'summary'
        },
        {
          name: 'Body',
          link: 'body'
        }
      ]
    }

    if (!peer) {
      linkList.push({
        name: 'Changes',
        link: 'changes'
      })
    }

    return (
      <Header
        leftChild={this.renderRef(css)}
        rightChild={this.renderButtons(css)}
        url={url}
        linkList={linkList}
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
