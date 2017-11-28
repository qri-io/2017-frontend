import React from 'react'
import PropTypes from 'prop-types'

import DatasetRefProps from '../propTypes/datasetRefProps.js'
import DatasetItem from './item/DatasetItem'
import PageHeader from './PageHeader.js'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class DatasetHeader extends Base {
  constructor (props) {
    super(props)
    this.state = {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      arrow: 'ss-directright',
      linkText: '...(read more)'
    };
    [
      'renderDescription'
    ].forEach((m) => { this[m] = this[m].bind(this) })
  }

  renderDescription (css, description) {
    if (description.length < 120) {
      return (<p>{description}</p>)
    } else {
      return (<p>{description.slice(0, 120)}<span className={`${css('linkText')} ${css('link')}`}>{this.state.linkText}</span></p>)
    }
  }

  template (css) {
    const { datasetRef, exportPath, onClickEdit, onClickDelete, onClickAdd, onGoBack, peer, bounds, description } = this.props
    const { name } = datasetRef
    return (
      <div className='dataSetHeader' style={{height: bounds.height}}>
        <PageHeader
          onGoBack={onGoBack}
          exportPath={exportPath}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          onClickAdd={onClickAdd}
          name={name}
        />
        <div className={css('item')} style={{height: bounds.height - 41}}>
          <DatasetItem data={datasetRef} link={false} peer={peer} />
          {this.renderDescription(css, description)}
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
  peer: PropTypes.bool
}

DatasetHeader.defaultProps = {
  palette: defaultPalette
}
