import React from 'react'
import PropTypes from 'prop-types'

import Button from '../chrome/Button'
import Base from '../Base'

export default class DatasetButtonGroup extends Base {
  template (css) {
    const {
      onAdd,
      transfering,
      onPublish,
      published,
      onEdit,
      exportPath,
      onRemove,
      onRename,
      isLocal,
      fromRegistry,
      isLatestDataset,
      isInNamespace
    } = this.props

    var buttons = []

    if (!isLocal && onAdd) {
      buttons.push({ onClick: onAdd, text: 'Add', loading: transfering })
    }

    const publishedText = published ? 'Unpublish' : 'Publish'
    if (isLocal && isInNamespace && isLatestDataset && onPublish) {
      buttons.push({ onClick: onPublish, text: publishedText })
    }

    if (isLatestDataset && !fromRegistry && onEdit) {
      buttons.push({ onClick: onEdit, text: 'Edit' })
    }

    if (isLocal && exportPath) {
      buttons.push({ download: exportPath, downloadName: 'dataset', text: 'Export' })
    }

    return (
      <div className={css('wrap')}>
        <div className={css('buttons')}>
          {buttons.map((b, i) => {
            return (<div className={css('button')} key={i}>
              <Button
                download={b.download}
                downloadName={b.downloadName}
                onClick={b.onClick}
                text={b.text}
                loading={b.loading}
              />
            </div>)
          })}
        </div>
        <div className={css('buttons')}>
          { isLocal && isLatestDataset && onRemove &&
          <a className='errLinkMedium' onClick={onRemove} >Remove</a> }
          { isLocal && isLatestDataset && onRename &&
          <a className='linkMedium' onClick={onRename} >Rename</a> }
        </div>
      </div>
    )
  }

  styles () {
    return {
      wrap: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        width: 300
      },
      buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap'
      },
      button: {
        marginBottom: 20
      }
    }
  }
}

DatasetButtonGroup.propTypes = {
  onAdd: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  transfering: PropTypes.bool,
  onPublish: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  published: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onEdit: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  exportPath: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRemove: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
}

DatasetButtonGroup.defaultProps = {
}
