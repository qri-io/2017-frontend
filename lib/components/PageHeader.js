import React from 'react'
import PropTypes from 'prop-types'

import { defaultPalette } from '../propTypes/palette'
import Base from './Base'

export default class PageHeader extends Base {
  template (css) {
    const { onGoBack, name, profile } = this.props
    const padding = profile ? 'paddingLeftRight' : undefined
    return (
      <div className={css('wrap', padding)}>
        <a className={`left ${css('link')}`} onClick={onGoBack}><span className='iconInline'>directleft</span> Back</a>
        {this.props.onClickAdd ? <a onClick={this.props.onClickAdd} className={`right ${css('link')}`}>Add </a> : undefined}
        {this.props.exportPath ? <a download={`${name}.zip`} href={`${this.props.exportPath}`} className={`right ${css('link')}`}>Export </a> : undefined}
        {this.props.onClickEdit ? <a onClick={this.props.onClickEdit} className={`right ${css('link')}`}>Edit </a> : undefined}
        {this.props.onClickRename ? <a onClick={this.props.onClickRename} className={`right ${css('link')}`}>Rename </a> : undefined}
        {this.props.onClickDelete ? <a onClick={this.props.onClickDelete} className={`right ${css('link')}`}>Delete </a> : undefined}
        {this.props.onClickShowHelp ? <a onClick={this.props.onClickShowHelp} className={`right ${css('link')}`}>Show Help</a> : undefined}
        {this.props.onClickHideHelp ? <a onClick={this.props.onClickHideHelp} className={`right ${css('link')}`}>Hide Help</a> : undefined}
        <hr className={css('hr')} />
      </div>
    )
  }

  styles () {
    const palette = defaultPalette
    return {
      wrap: {
        paddingTop: 50,
        fontSize: 20
      },
      paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20
      },
      hr: {
        borderTop: `1px solid ${palette.neutral}`,
        display: 'block',
        width: '100%',
        marginBottom: 0,
        marginTop: 30
      },
      link: {
        marginLeft: '5px',
        marginRight: '5px',
        color: palette.neutral
      }
    }
  }
}

PageHeader.propTypes = {
  name: PropTypes.string,
  profile: PropTypes.bool,
  onGoBack: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func,
  exportPath: PropTypes.string,
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickShowHelp: PropTypes.func,
  onClickHideHelp: PropTypes.func
}

PageHeader.defaultProps = {
  profile: false
}
