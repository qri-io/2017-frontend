import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import DatasetName from '../DatasetName'
import Header from '../Header'

import { defaultPalette } from '../../propTypes/palette'
import Base from '../Base'

export default class EditHeader extends Base {
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
    const { peername } = this.props
    return (
      <div>
        <DatasetName peername={peername} name={'New Dataset'} large style={{ display: 'inline-block', marginTop: 15 }} />
      </div>
    )
  }

  renderButtons (css) {
    const { onRun } = this.props
    return (
      <div className={css('buttons')}>
        <span className={css('button')}><Button text='Run' onClick={onRun} color='c' name='run' /></span>
        {/* <span className={css('button')}><Button text='Save' onClick={onClickAdd} color='a' name='add' /></span> */}
        {/* <span className={css('button')}><Button color='c' text='Export' downloadName={datasetRef.name} download={exportPath} /></span> */}
      </div>
    )
  }

  template (css) {
    const { url } = this.props

    let linkList = [
      // {
      //   name: 'Meta',
      //   link: 'meta'
      // },
      // {
      //   name: 'Viz',
      //   link: 'viz'
      // },
      // {
      //   name: 'Transform',
      //   link: 'transform'
      // }
      // {
      //   name: 'Structure',
      //   link: 'structure'
      // }
    ]

    return (
      <Header
        leftChild={this.renderRef(css)}
        rightChild={this.renderButtons(css)}
        url={url}
        linkList={linkList}
        spinner={false}
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

EditHeader.propTypes = {
  exportPath: PropTypes.string,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  onClickAdd: PropTypes.func,
  name: PropTypes.string
}

EditHeader.defaultProps = {
}
