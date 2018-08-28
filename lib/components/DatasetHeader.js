import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'
import PageHeader from './PageHeader'
import ReadOnlyHeader from './ReadOnlyHeader'
import Button from './Button'
import DatasetName from './DatasetName'
import Hash from './Hash'
import DatasetNav from './DatasetNav'

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
      'renderHeader'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleReadMore (e) {
    this.setState({readMore: !this.state.readMore})
  }

  renderHeader () {
    const { datasetRef, onClickEdit, onGoBack, isLatestDataset, sessionProfile } = this.props
    const { name } = datasetRef
    if (sessionProfile) {
      return <PageHeader
        onGoBack={onGoBack}
        onClickEdit={isLatestDataset ? onClickEdit : undefined}
        name={name}
      />
    } else {
      return <ReadOnlyHeader
        onGoBack={onGoBack}
      />
    }
  }

  template (css) {
    const { datasetRef, isLatestDataset, onClickDelete, onClickAdd, exportPath, peername, name, url } = this.props
    return (
      <div className={css('wrap')}>
        <div className='datasetContent' >
          <div className={css('top')}>
            <div className={css('ref')}>
              <DatasetName peername={peername} name={name || 'unnamed dataset'} xlarge style={{display: 'inline-block', marginTop: 15}} />{!isLatestDataset ? <span style={{marginLeft: 10}}>Not latest version</span> : undefined}
              <Hash hash={datasetRef.path} style={{marginBottom: 15}} />
            </div>
            <div className={css('buttons')}>
              { onClickDelete ? <span className={css('button')}><Button text='Remove' onClick={onClickDelete} color='d' name='remove' /></span> : undefined }
              { onClickAdd ? <span className={css('button')}><Button text='Add' onClick={onClickAdd} color='a' name='add' /></span> : undefined }
              { exportPath ? <span className={css('button')}><Button color='c' text='Export' downloadName={datasetRef.name} download={exportPath} /></span> : undefined }
            </div>
          </div>
          <div className={css('bottom')}>
            <DatasetNav url={url} />
          </div>
        </div>
      </div>
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
        justifyContent: 'space-between'
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
