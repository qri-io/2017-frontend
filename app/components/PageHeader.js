import React, { PropTypes } from 'react'

import { Palette, defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class PageHeader extends Base {
  template (css) {
    const { onGoBack, name } = this.props
    return (
      <div className='wrap'>
        <div className=''>
          <a className={`left ${css('link')}`} onClick={onGoBack}>◂ Back</a>
          {this.props.onClickAdd ? <a onClick={this.props.onClickAdd} className={`right ${css('link')}`}>Add </a> : undefined}
          {this.props.exportPath ? <a download={`${name}.zip`} href={`${this.props.exportPath}`} className={`right ${css('link')}`}>Export </a> : undefined}
          {this.props.onClickEdit ? <a onClick={this.props.onClickEdit} className={`right ${css('link')}`}>Edit </a> : undefined}
          {this.props.onClickDelete ? <a onClick={this.props.onClickDelete} className={`right ${css('link')}`}>Delete </a> : undefined}
          {this.props.onClickShowHelp ? <a onClick={this.props.onClickShowHelp} className={`right ${css('link')}`}>Show Help</a> : undefined}
          {this.props.onClickHideHelp ? <a onClick={this.props.onClickHideHelp} className={`right ${css('link')}`}>Hide Help</a> : undefined}
        </div>
        <div className=''>
          <hr className={css('hr')} />
        </div>
      </div>
    )
  }

  styles (props) {
    const { palette } = props
    return {
      hr: {
        'border-top': `1px solid ${palette.a}`,
        display: 'block',
        width: '100%'
      },
      link: {
        'margin-left': '5px',
        'margin-right': '5px',
        color: palette.a
      }
    }
  }
}

PageHeader.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func,
  onClickDownload: PropTypes.func,
  // exportPath: PropTypes.string,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickShowHelp: PropTypes.func,
  onClickHideHelp: PropTypes.func
}

PageHeader.defaultProps = {
  palette: defaultPalette
}
