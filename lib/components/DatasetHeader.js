import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps'
import DatasetItem from './item/DatasetItem'
import PageHeader from './PageHeader'
import ReadOnlyHeader from './ReadOnlyHeader'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class DatasetHeader extends Base {
  constructor (props) {
    super(props)
    this.state = {
      readMore: true
    };
    [
      'renderDescription',
      'handleReadMore',
      'renderHeader'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  handleReadMore (e) {
    this.setState({readMore: !this.state.readMore})
  }

  renderDescription (css, description) {
    if (description.length < 120) {
      return (<p>{description}</p>)
    } else if (this.state.readMore) {
      return (<p>{description.slice(0, 120)}<span className={`${css('linkText')} ${css('link')}`} onClick={this.handleReadMore}>... <small>(read more)</small></span></p>)
    } else {
      return (<p>{description}<span className={`${css('linkText')} ${css('link')}`} onClick={this.handleReadMore}> <small>(read less)</small></span></p>)
    }
  }

  renderHeader () {
    const { datasetRef, exportPath, onClickEdit, onClickRename, onClickDelete, onClickAdd, onGoBack, isLatestDataset, sessionProfile } = this.props
    const { name } = datasetRef
    if (sessionProfile) {
      return <PageHeader
        onGoBack={onGoBack}
        exportPath={exportPath}
        onClickEdit={isLatestDataset ? onClickEdit : undefined}
        onClickRename={isLatestDataset ? onClickRename : undefined}
        onClickDelete={isLatestDataset ? onClickDelete : undefined}
        onClickAdd={onClickAdd}
        name={name}
        />
    } else {
      return <ReadOnlyHeader
        onGoBack={onGoBack}
        />
    }
  }

  template (css) {
    const { datasetRef, peer, isLatestDataset } = this.props
    return (
      <div className='dataSetHeader'>
        {this.renderHeader()}
        <div className={css('item')} >
          <DatasetItem data={datasetRef} link={false} peer={peer} isLatestDataset={isLatestDataset} />
          {/* this.renderDescription(css, description) */}
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
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
  palette: Palette,
  peer: PropTypes.bool,
  sessionProfile: PropTypes.string
}

DatasetHeader.defaultProps = {
  palette: defaultPalette
}
