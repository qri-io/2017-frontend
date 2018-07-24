import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'
import PageHeader from './PageHeader'
import ReadOnlyHeader from './ReadOnlyHeader'
import Button from './Button'
import DatasetName from './DatasetName'
import Hash from './Hash'

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
    const { datasetRef, isLatestDataset, onClickRename, onClickDelete, onClickAdd, exportPath } = this.props
    return (
      <div className='dataSetHeader'>
        <div className={css('flex')}>
          <div className={css('datasetItem')}>
            {!isLatestDataset ? <div className={css('previousCommit')}>You are viewing a previous version of this dataset</div> : undefined}
            <div className='displayInlineBlock'>
              <DatasetName rename={onClickRename} peername={datasetRef.peername} name={datasetRef.name || 'unnamed dataset'} xlarge style={{display: 'inline-block', marginTop: 15}} />
              <Hash hash={datasetRef.path} style={{marginBottom: 15}} />
            </div>
          </div>
          <div className={css('buttons')}>
            { onClickDelete ? <span className={css('button')}><Button text='Remove' onClick={onClickDelete} color='d' name='remove' /></span> : undefined }
            { onClickAdd ? <span className={css('button')}><Button text='Add' onClick={onClickAdd} color='a' name='add' /></span> : undefined }
            { exportPath ? <span className={css('button')}><Button color='c' text='Export' downloadName={datasetRef.name} download={exportPath} /></span> : undefined }
          </div>
        </div>
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      item: {
        width: '100%',
        overflow: 'auto'
      },
      ssPika: {
        fontFamily: 'SSPika',
        marginRight: '10px',
        paddingTop: '3px'
      },
      linkText: {
        marginLeft: '0px'
      },
      link: {
        color: palette.a,
        ':hover': {
          cursor: 'pointer',
          color: palette.hover
        }
      },
      flex: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: '30px 0 0 0'
      },
      buttons: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        margin: '10px 0 10px 0',
        width: 220
      },
      datasetItem: {
        width: '60%'
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
  sessionProfile: PropTypes.string
}

DatasetHeader.defaultProps = {
}
